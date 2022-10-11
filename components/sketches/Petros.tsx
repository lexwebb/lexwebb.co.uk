import P5 from "p5"; //Import this for typechecking and intellisense
import React, { useState } from "react";
import useDarkMode from "use-dark-mode";

import P5Sketch from "../P5Sketch";
import { useSketchSize } from "../SketchContainer";

const Petros: React.FC = () => {
  const { height } = useSketchSize();
  const { value } = useDarkMode();
  const [vars, setVars] = useState<ReturnType<typeof getVars>>(
    {} as unknown as ReturnType<typeof getVars>
  );

  const GROUND_SEGMENTS = 10;
  const FLOOR_HEIGHT = height - 50;
  const FLOOR_JIGGLE = 5;

  const getVars = (p5: P5) => {
    const floorSegmentXs = Array.from(
      { length: GROUND_SEGMENTS + 1 },
      (_, i) => {
        return i * (p5.width / GROUND_SEGMENTS);
      }
    );

    const floorSegments = floorSegmentXs.map((segment) => {
      const jiggle = p5.random(
        FLOOR_HEIGHT - FLOOR_JIGGLE,
        FLOOR_HEIGHT + FLOOR_JIGGLE
      );
      return { x: segment, y: jiggle };
    });

    return {
      foreground: value ? "#fff" : "#000",
      background: value ? "#000" : "#fff",
      floorSegments,
    };
  };

  const setup = (p5: P5, canvasParentRef: Element) => {
    setVars(getVars(p5));
  };

  const drawGround = (p5: P5) => {
    p5.color(vars.foreground);
    p5.fill(vars.background);

    p5.strokeWeight(4);
    p5.stroke(vars.foreground);

    p5.beginShape();
    // start left
    p5.curveVertex(0, FLOOR_HEIGHT);

    // draw segments
    vars.floorSegments.forEach((segment) => {
      p5.curveVertex(segment.x, segment.y);
    });

    // end right
    p5.curveVertex(p5.width, FLOOR_HEIGHT);

    p5.vertex(p5.width + 50, FLOOR_HEIGHT);
    p5.vertex(p5.width + 50, p5.height + 50);
    p5.vertex(-50, p5.height + 50);
    p5.vertex(-50, FLOOR_HEIGHT);

    p5.endShape();
  };

  const draw = (p5: P5) => {
    p5.background(0);

    drawGround(p5);
  };

  return <P5Sketch draw={draw} setup={setup} />;
};

export default Petros;
