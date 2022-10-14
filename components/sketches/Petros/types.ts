export interface Globals {
  GROUND_SEGMENTS: number;
  FLOOR_HEIGHT: number;
  FLOOR_JIGGLE: number;
  ROOM_SIZE: number;
  MAX_BUILDING_WIDTH: number;
  MIN_BUILDING_WIDTH: number;
  MAX_BUILDING_HEIGHT: number;
}

export interface Building {
  depth: number;
  rooms: Room[][];
}

export interface Room {
  x: number;
  width: number;
  height: number;
  type: "room" | "spire" | "crenelation";
}
