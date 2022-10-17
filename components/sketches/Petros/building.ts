import P5 from "p5";

import {
  WeightedRandom,
  getBellCurveRandom,
  getExpoWeightedRandom,
  getWeightedRandom,
  sequence,
} from "../utils";
import { Building, Globals, Room } from "./types";

// const generateLayerRoomDistribution = (
//   p5: P5,
//   globals: Globals,
//   layer: number
// ): WeightedRandom[] => {
//   const maxRooms = p5.max(5 - layer, 1);

//   return sequence(maxRooms).map((i) => ({
//     value: i,
//     weight: i,
//   }));
// };

export const generateBuilding = (p5: P5, globals: Globals): Building => {
  const buildingHeight = p5.round(
    getExpoWeightedRandom(
      p5,
      globals.MIN_BUILDING_HEIGHT,
      globals.MAX_BUILDING_HEIGHT
    )
  );
  const buildingWidth = p5.round(
    getBellCurveRandom(
      p5,
      globals.MIN_BUILDING_WIDTH,
      globals.MAX_BUILDING_WIDTH
    )
  );

  const lowerWeights: WeightedRandom<Building["rooms"][0][0]["type"]>[] = [
    { value: "room", weight: 6 },
    { value: "crenelation", weight: 4 },
    { value: "spire", weight: 1 },
  ];

  const midWeights: WeightedRandom<Building["rooms"][0][0]["type"]>[] = [
    { value: "room", weight: 4 },
    { value: "crenelation", weight: 6 },
    { value: "spire", weight: 2 },
  ];

  const upperWeights: WeightedRandom<Building["rooms"][0][0]["type"]>[] = [
    { value: "room", weight: 3 },
    { value: "crenelation", weight: 2 },
    { value: "spire", weight: 6 },
  ];

  const getWeightByFloor = (floor: number) => {
    if (floor < buildingHeight / 3) {
      return lowerWeights;
    } else if (floor < (buildingHeight / 3) * 2) {
      return midWeights;
    } else {
      return upperWeights;
    }
  };

  return {
    width: buildingWidth,
    height: buildingHeight,
    rooms: sequence(buildingHeight).map((i) => {
      const rooms: Room[] = [];
      let full = false;

      const type = getWeightedRandom(p5, getWeightByFloor(i));

      const getPreviousRoomEnd = () => {
        if (rooms.length === 0) return 0;
        return rooms[rooms.length - 1].width + rooms[rooms.length - 1].x;
      };

      const maxNoRooms = p5.round(getExpoWeightedRandom(p5, 1, 3, true));

      while (!full) {
        const maxWidth =
          type === "spire"
            ? 1
            : p5.round(
                getBellCurveRandom(
                  p5,
                  1,
                  buildingWidth - getPreviousRoomEnd(),
                  0.5 * i
                )
              );

        const roomWidth = p5.round(getBellCurveRandom(p5, 1, maxWidth));
        const roomX = p5.round(
          p5.random(getPreviousRoomEnd(), buildingWidth - roomWidth)
        );

        const room: Room = {
          width: roomWidth,
          x: roomX,
          height: type === "spire" ? 2 : p5.round(p5.random(1, 2)),
          type,
        };

        rooms.push(room);

        if (
          getPreviousRoomEnd() >= buildingWidth ||
          rooms.length >= maxNoRooms
        ) {
          full = true;
        }
      }

      return rooms;
    }),
  };
};

export const drawBuilding = (p5: P5, building: Building, globals: Globals) => {
  const xOffset = p5.width / 2 - (building.width * globals.ROOM_SIZE) / 2;

  console.log(building.rooms);
  building.rooms
    .slice()
    .reverse()
    .forEach((layer, index) => {
      const layerHeightOffset =
        (building.rooms.length - index - 1) * globals.ROOM_SIZE;
      layer.forEach((room) => {
        const roomOffset = xOffset + room.x * globals.ROOM_SIZE;

        const xPos = roomOffset;
        const yPos = globals.FLOOR_HEIGHT;
        const width = room.width * globals.ROOM_SIZE;
        const height = -(layerHeightOffset + room.height * globals.ROOM_SIZE);
        const radius = 3;
        const initY = yPos + height;

        switch (room.type) {
          case "crenelation":
            p5.strokeJoin(p5.ROUND);
            p5.beginShape();
            p5.vertex(xPos, yPos);

            sequence(room.width).forEach((i) => {
              const x1 = xPos + i * globals.ROOM_SIZE;
              const x2 = x1 + globals.ROOM_SIZE / 2;
              const x3 = x1 + globals.ROOM_SIZE;
              const y1 = initY + globals.ROOM_SIZE / 2;
              const y2 = initY;
              p5.vertex(x1, y1);
              p5.vertex(x2, y1);
              p5.vertex(x2, y2);
              p5.vertex(x3, y2);
            });

            p5.vertex(xPos + width, yPos);

            p5.endShape();
            break;

          case "spire":
            p5.rect(xPos, yPos, width, height, radius, radius);
            p5.ellipse(
              xPos + globals.ROOM_SIZE / 3,
              initY + globals.ROOM_SIZE / 2,
              globals.ROOM_SIZE / 3,
              globals.ROOM_SIZE / 4
            );
            break;
          default:
            p5.rect(xPos, yPos, width, height, radius, radius);
        }
      });
    });
};
