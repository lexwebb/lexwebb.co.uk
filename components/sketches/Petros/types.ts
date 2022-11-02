export interface Globals {
  GROUND_SEGMENTS: number;
  FLOOR_HEIGHT: number;
  FLOOR_JIGGLE: number;
  ROOM_SIZE: number;
  BUILDING_HEIGHT: number;
  MIN_BUILDING_WIDTH: number;
  MAX_BUILDING_WIDTH: number;
}

export interface Building {
  width: number;
  height: number;
  rooms: Room[][];
}

export interface Room {
  x: number;
  width: number;
  height: number;
  type: "room" | "spire" | "crenelation";
  canHaveBalcony: boolean;
}
