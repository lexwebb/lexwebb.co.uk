import P5 from "p5";
import React, { useState } from "react";
import useDarkMode from "use-dark-mode";

import P5Sketch from "../../P5Sketch";
import { useSketchSize } from "../../SketchContainer";
import { drawBuilding, generateBuilding } from "./building";
import { drawGround, getGroundVars } from "./ground";
import { Globals } from "./types";

const Petros: React.FC = () => {
  const { height } = useSketchSize();
  const { value } = useDarkMode();
  const [vars, setVars] = useState<ReturnType<typeof getVars>>(
    {} as unknown as ReturnType<typeof getVars>
  );

  const globals: Globals = {
    GROUND_SEGMENTS: 10,
    FLOOR_HEIGHT: height - 50,
    FLOOR_JIGGLE: 5,
    ROOM_SIZE: 50,
    MAX_BUILDING_HEIGHT: 5,
    MAX_BUILDING_WIDTH: 5,
    MIN_BUILDING_WIDTH: 2,
  };

  const getVars = (p5: P5) => {
    const ground = getGroundVars(p5, globals);
    const building = generateBuilding(p5, globals);

    return {
      foreground: value ? "#fff" : "#000",
      background: value ? "#000" : "#fff",
      ground,
      building,
    };
  };

  const setup = (p5: P5, canvasParentRef: Element) => {
    const vars = getVars(p5);
    setVars(vars);
  };

  const draw = (p5: P5) => {
    p5.background(0);

    // setup colors
    p5.color(vars.foreground);
    p5.fill(vars.background);
    p5.strokeWeight(4);
    p5.stroke(vars.foreground);

    drawBuilding(p5, vars.building, globals);
    drawGround(p5, vars.ground.floorSegments, globals);

    p5.noLoop();
  };

  return <P5Sketch draw={draw} setup={setup} />;
};

export default Petros;
