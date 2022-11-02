import P5 from "p5";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useDarkMode from "use-dark-mode";

import P5Sketch from "../../P5Sketch";
import { useSketch } from "../../SketchContainer";
import { drawBuilding, generateBuilding } from "./building";
import { drawClouds, generateClouds } from "./clouds";
import { drawGround, getGroundVars } from "./ground";
import { drawStones, generateStones } from "./stones";
import { Building, Globals } from "./types";

const Petros: React.FC = () => {
  const { height, params } = useSketch();
  const { value } = useDarkMode();

  const p5Ref = useRef<P5>();
  const [vars, setVars] = useState<ReturnType<typeof getVars>>();

  const getVars = useMemo(
    () => (p5: P5) => {
      const globals: Globals = {
        GROUND_SEGMENTS: 10,
        FLOOR_HEIGHT: height - 50,
        FLOOR_JIGGLE: 5,
        ROOM_SIZE: 50,
        BUILDING_HEIGHT: params["floors"] || 5,
        MAX_BUILDING_WIDTH: 7,
        MIN_BUILDING_WIDTH: 4,
      };

      const seed = p5.random(1000);
      p5.randomSeed(seed);

      const ground = getGroundVars(p5, globals);
      const building = generateBuilding(p5, globals);
      const stones = generateStones(p5, globals, building);
      const clouds = generateClouds(p5, globals);

      return {
        foreground: value ? "#fff" : "#000",
        background: value ? "#000" : "#fff",
        ground,
        building,
        stones,
        clouds,
        globals,
        seed,
      };
    },
    [height, params, value]
  );

  useEffect(() => {
    if (p5Ref.current) {
      setVars(getVars(p5Ref.current));
    }
  }, [getVars]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5Ref.current = p5;
  };

  const draw = (p5: P5) => {
    if (!vars) {
      setVars(getVars(p5));
      return;
    }

    p5.background(vars.background);

    const reset = () => {
      p5.color(vars.foreground);
      p5.fill(vars.background);
      p5.strokeWeight(4);
      p5.stroke(vars.foreground);
    };

    // setup colors
    reset();

    drawClouds(p5, vars.clouds);

    drawBuilding(p5, vars.building, vars.globals, 1);
    drawGround(p5, vars.ground.floorSegments, vars.globals);

    p5.noStroke();
    p5.fill(vars.foreground);

    drawStones(p5, vars.stones);

    reset();
    drawBuilding(p5, vars.building, vars.globals, 0, 1);
  };

  return <P5Sketch draw={draw} setup={setup} />;
};

export default Petros;
