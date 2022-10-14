import P5 from "p5";

import { Building, Globals, Room } from "./types";

export const generateBuilding = (p5: P5, globals: Globals): Building => {
  const layers = p5.round(p5.random(1, globals.MAX_BUILDING_HEIGHT));
  const width = p5.round(
    p5.random(globals.MIN_BUILDING_WIDTH, globals.MAX_BUILDING_WIDTH)
  );

  const typeArray: Building["rooms"][0][0]["type"][] = [
    "room",
    "spire",
    "crenelation",
  ];

  // https://editor.p5js.org/runemadsen/sketches/S1IZV_HAZ
  // Use to generate a weighted random distribution of rooms

  return {
    depth: layers,
    rooms: Array.from({ length: layers }, (_, i) => {
      return Array.from({ length: width }, (_, j) => {
        return {
          x: p5.round(p5.random(0, globals.MAX_BUILDING_WIDTH - 1)),
          width: p5.round(p5.random(0, globals.MAX_BUILDING_WIDTH - 1)),
          height: p5.round(p5.random(1, 2)),
          type: typeArray[p5.round(p5.random(0, 2))],
        } as Room;
      });
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
      layer.forEach((room) => {
        const roomOffset = xOffset + room.x * globals.ROOM_SIZE;
        // TODO refactor this spaghetti to be more readable
        p5.rect(
          room.x + roomOffset,
          globals.FLOOR_HEIGHT,
          room.height * globals.ROOM_SIZE,
          ((building.rooms.length - index) * globals.ROOM_SIZE +
            room.height * globals.ROOM_SIZE) *
            -1
        );
      });
    });
};
