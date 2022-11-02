import P5 from "p5";

import { sequence } from "../utils";
import { Globals } from "./types";

type FlawVertex = {
  x: number;
  y: number;
};

export const getGroundVars = (
  p5: P5,
  globals: Globals
): { floorSegments: FlawVertex[] } => {
  const floorSegmentXs = sequence(globals.GROUND_SEGMENTS + 1).map((_, i) => {
    return i * (p5.width / globals.GROUND_SEGMENTS);
  });

  const floorSegments = floorSegmentXs.map((segment) => {
    const jiggle = p5.random(
      globals.FLOOR_HEIGHT - globals.FLOOR_JIGGLE,
      globals.FLOOR_HEIGHT + globals.FLOOR_JIGGLE
    );
    return { x: segment, y: jiggle - globals.FLOOR_JIGGLE * 2 };
  });

  return { floorSegments };
};

export const drawGround = (
  p5: P5,
  floorSegments: FlawVertex[],
  globals: Globals
) => {
  p5.beginShape();
  // start left
  p5.curveVertex(0, globals.FLOOR_HEIGHT);

  // draw segments
  floorSegments.forEach((segment) => {
    p5.curveVertex(segment.x, segment.y);
  });

  // end right
  p5.curveVertex(p5.width, globals.FLOOR_HEIGHT);

  p5.vertex(p5.width + 50, globals.FLOOR_HEIGHT);
  p5.vertex(p5.width + 50, p5.height + 50);
  p5.vertex(-50, p5.height + 50);
  p5.vertex(-50, globals.FLOOR_HEIGHT);

  p5.endShape();
};
