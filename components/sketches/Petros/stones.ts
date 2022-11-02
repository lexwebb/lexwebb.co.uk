import P5 from "p5";

import { Building, Globals } from "./types";

export type Circle = {
  x: number;
  y: number;
  rx: number;
  ry: number;
};

export const generateStones = (
  p5: P5,
  globals: Globals,
  building: Building
) => {
  const circles: Circle[] = [];
  const xOffset = p5.width / 2 - (building.width * globals.ROOM_SIZE) / 2;

  let protection = 0;
  while (circles.length < 500) {
    const circle: Circle = {
      x: p5.random(xOffset, xOffset + building.width * globals.ROOM_SIZE),
      y: p5.random(
        globals.FLOOR_HEIGHT - globals.FLOOR_JIGGLE,
        globals.FLOOR_HEIGHT
      ),
      rx: p5.random(3, 5),
      ry: p5.random(3, 5),
    };

    // Does it overlap any previous circles?
    let overlapping = false;
    for (let j = 0; j < circles.length; j++) {
      const other = circles[j];
      const d = p5.dist(circle.x, circle.y, other.x, other.y);
      if (d < circle.rx + other.rx || d < circle.ry + other.ry) {
        overlapping = true;
      }
    }

    if (!overlapping) {
      circles.push(circle);
    }

    protection++;
    if (protection > 10000) {
      break;
    }
  }

  return circles;
};

export const drawStones = (p5: P5, stones: Circle[]) => {
  for (let i = 0; i < stones.length; i++) {
    p5.ellipse(stones[i].x, stones[i].y, stones[i].rx * 2, stones[i].ry * 2);
  }
};
