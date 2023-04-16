import P5 from "p5";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useDarkMode from "use-dark-mode";

import P5Sketch from "../P5Sketch";
import { useSketch } from "../SketchContainer";

const LineyNoise: React.FC = () => {
  const { height, width, params } = useSketch();
  const { value } = useDarkMode();

  const p5Ref = useRef<P5>();
  const [vars, setVars] = useState<ReturnType<typeof getVars>>();

  const getVars = useMemo(
    () => (p5: P5) => {
      const seed = p5.random(1000);
      p5.randomSeed(seed);
      p5.noiseSeed(seed);

      return {
        foreground: value ? "#fff" : "#000",
        background: value ? "#000" : "#fff",
        numberOfLines: 100,
        resolution: 10,
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

  const setup = (p5: P5) => {
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
      p5.fill(vars.foreground);
      p5.stroke(vars.foreground);
      p5.strokeWeight(1);
      p5.noFill();
    };

    const spacing = height / vars.numberOfLines;

    for (let row = 0; row < vars.numberOfLines; row++) {
      p5.beginShape();
      for (let col = 0; col < width; col += vars.resolution) {
        const y =
          row * spacing +
          p5.noise(row / 10, col / 10, p5.frameCount / 500) * 20 -
          5;
        const x = col;
        p5.curveVertex(x, y);
      }

      p5.endShape();
    }

    // setup colors
    reset();
  };

  return <P5Sketch draw={draw} setup={setup} />;
};

export default LineyNoise;
