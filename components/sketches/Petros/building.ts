import P5 from "p5";

import {
  WeightedRandom,
  getBellCurveRandom,
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
  const layers = p5.round(p5.random(1, globals.MAX_BUILDING_HEIGHT));
  const buildingWidth = p5.round(
    p5.random(globals.MIN_BUILDING_WIDTH, globals.MAX_BUILDING_WIDTH)
  );

  const typeArray: Building["rooms"][0][0]["type"][] = [
    "room",
    "spire",
    "crenelation",
  ];

  // https://editor.p5js.org/runemadsen/sketches/S1IZV_HAZ
  // Use to generate a weighted random distribution of rooms

  console.log({ layers, buildingWidth });
  return {
    depth: layers,
    rooms: sequence(layers).map((i) => {
      const noRooms = p5.round(
        getBellCurveRandom(p5, 1, buildingWidth - 1, 0.25 * i)
      );
      console.log({ noRooms, i });

      const rooms: Room[] = [];

      // TODO, switch to add one room at a time a check for remaining space use a while loop, bell curve for room width
      sequence(noRooms).forEach((j) => {
        const previousRoom = rooms[j - 1];
        const minX = previousRoom ? previousRoom.x + previousRoom.width : 0;
        const xLoc = p5.round(p5.random(minX, buildingWidth - noRooms + j + 1));
        rooms.push({
          x: xLoc,
          width: 1,
          height: p5.round(p5.random(1, 2)),
          type: typeArray[p5.round(p5.random(0, 2))],
        });
      });

      return rooms;
    }),
  };
};

export const drawBuilding = (p5: P5, building: Building, globals: Globals) => {
  const xOffset =
    p5.width / 2 - (building.rooms[0].length * globals.ROOM_SIZE) / 2;

  building.rooms
    .slice()
    .reverse()
    .forEach((layer, index) => {
      const layerHeightOffset =
        (building.rooms.length - index) * globals.ROOM_SIZE;
      layer.forEach((room) => {
        p5.fill(20 * index);
        const roomOffset = xOffset + room.x * globals.ROOM_SIZE;
        // TODO refactor this spaghetti to be more readable
        p5.rect(
          room.x + roomOffset,
          globals.FLOOR_HEIGHT,
          room.width * globals.ROOM_SIZE,
          -(layerHeightOffset + room.height * globals.ROOM_SIZE),
          3,
          3
        );
      });
    });
};
