import P5 from "p5";

import {
  WeightedRandom,
  getBellCurveRandom,
  getExpoWeightedRandom,
  getWeightedRandom,
  sequence,
} from "../utils";
import { Building, Globals, Room } from "./types";

export const generateBuilding = (p5: P5, globals: Globals): Building => {
  const buildingHeight = globals.BUILDING_HEIGHT;

  const buildingWidth = p5.round(
    getBellCurveRandom(
      p5,
      globals.MIN_BUILDING_WIDTH,
      globals.MAX_BUILDING_WIDTH
    )
  );

  const lowerWeights: WeightedRandom<Building["rooms"][0][0]["type"]>[] = [
    { value: "room", weight: 6 },
    { value: "crenelation", weight: 1 },
    { value: "spire", weight: 1 },
  ];

  const midWeights: WeightedRandom<Building["rooms"][0][0]["type"]>[] = [
    { value: "room", weight: 4 },
    { value: "crenelation", weight: 6 },
    { value: "spire", weight: 2 },
  ];

  const upperWeights: WeightedRandom<Building["rooms"][0][0]["type"]>[] = [
    { value: "room", weight: 3 },
    { value: "crenelation", weight: 1 },
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
          canHaveBalcony: p5.floor(p5.random(1, 10)) === 1,
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

export const drawBuilding = (
  p5: P5,
  building: Building,
  globals: Globals,
  skip?: number,
  take?: number
) => {
  const xOffset = p5.width / 2 - (building.width * globals.ROOM_SIZE) / 2;

  building.rooms
    .slice()
    .reverse()
    .forEach((layer, index) => {
      const reverseIndex = building.rooms.length - index - 1;
      if (skip && reverseIndex < skip) return;
      if (take && reverseIndex >= take) return;

      const layerRoomSize = globals.ROOM_SIZE - reverseIndex * 4;

      const layerHeightOffset =
        (building.rooms.length - index - 1) * globals.ROOM_SIZE;

      layer.forEach((room, roomIndex) => {
        const roomOffset = xOffset + room.x * layerRoomSize;

        const xPos = roomOffset;
        const yPos = globals.FLOOR_HEIGHT;
        const width = room.width * layerRoomSize;
        const height = -(layerHeightOffset + room.height * globals.ROOM_SIZE);
        const radius = 3;
        const initY = yPos + height;

        if (roomIndex === 0 && room.canHaveBalcony) {
          p5.line(
            xPos - globals.ROOM_SIZE / 2,
            initY + globals.ROOM_SIZE / 1.5,
            xPos,
            initY + globals.ROOM_SIZE / 1.5
          );
        }

        if (roomIndex === layer.length - 1 && room.canHaveBalcony) {
          p5.line(
            xPos + width,
            initY + globals.ROOM_SIZE / 1.5,
            xPos + width + globals.ROOM_SIZE / 2,
            initY + globals.ROOM_SIZE / 1.5
          );
        }

        switch (room.type) {
          case "crenelation":
            p5.strokeJoin(p5.ROUND);
            p5.beginShape();
            p5.vertex(xPos, yPos);

            sequence(room.width).forEach((i) => {
              const x1 = xPos + i * layerRoomSize;
              const x2 = x1 + layerRoomSize / 2;
              const x3 = x1 + layerRoomSize;
              const y1 = initY + globals.ROOM_SIZE / 2;
              const y2 = initY;
              p5.vertex(x1, y1);
              p5.vertex(x2, y1);
              p5.vertex(x2, y2);
              p5.vertex(x3, y2);
            });

            p5.vertex(xPos + width, yPos);
            p5.vertex(xPos, yPos);

            p5.endShape();
            break;

          case "spire":
            p5.rect(xPos, yPos, width, height, radius, radius);
            p5.ellipse(
              xPos + layerRoomSize / 3,
              initY + globals.ROOM_SIZE / 2,
              layerRoomSize / 3,
              layerRoomSize / 4
            );
            break;
          default:
            p5.rect(xPos, yPos, width, height, radius, radius);
            break;
        }
      });
    });
};
