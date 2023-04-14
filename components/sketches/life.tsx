import P5 from "p5";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useDarkMode from "use-dark-mode";

import P5Sketch from "../P5Sketch";
import { useSketch } from "../SketchContainer";

let grid: number[][] = [];
let nextGrid: number[][] = [];

const Life: React.FC = () => {
  const { height, width, params } = useSketch();
  const { value } = useDarkMode();

  const p5Ref = useRef<P5>();
  const [vars, setVars] = useState<ReturnType<typeof getVars>>();

  const getVars = useMemo(
    () => (p5: P5) => {
      const seed = p5.random(1000);
      p5.randomSeed(seed);

      return {
        foreground: value ? "#fff" : "#000",
        background: value ? "#000" : "#fff",
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

    console.log(width, height);

    // grid[1][2] = 1;
    // grid[2][3] = 1;
    // grid[3][1] = 1;
    // grid[3][2] = 1;
    // grid[3][3] = 1;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (grid[i] === undefined) grid[i] = [];
        if (p5.random(1) > 0.9) {
          grid[i][j] = 1;
        } else {
          grid[i][j] = 0;
        }
      }
    }
    nextGrid = grid;
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
      p5.strokeWeight(0);
    };

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
              continue;
            }

            const neighborRow = row + i;
            const neighborCol = col + j;

            if (
              neighborRow >= 0 &&
              neighborRow < height &&
              neighborCol >= 0 &&
              neighborCol < width
            ) {
              // increment the neighbor count if the neighbor is alive
              neighbors += grid[neighborRow][neighborCol];
            }
          }
        }

        if (grid[row][col] === 1) {
          // cell is alive
          if (neighbors < 2 || neighbors > 3) {
            // cell dies due to underpopulation or overpopulation
            nextGrid[row][col] = 0;
          } else {
            // cell survives
            nextGrid[row][col] = 1;
          }
        } else {
          // cell is dead
          if (neighbors === 3) {
            // cell becomes alive due to reproduction
            nextGrid[row][col] = 1;
          } else {
            // cell remains dead
            nextGrid[row][col] = 0;
          }
        }

        // draw the cell
        if (grid[row][col] === 1) {
          p5.rect(col, row, 1, 1);
        }
      }
    }
    // set the grid to the next state
    grid = nextGrid;
    // create a new nextGrid
    nextGrid = Array(height)
      .fill(null)
      .map(() => Array(width).fill(null));

    // setup colors
    reset();
  };

  const mousePressed = (p5: P5) => {
    const x = p5.floor(p5.mouseX);
    const y = p5.floor(p5.mouseY);

    if (x < 0 || x > width || y < 0 || y > height) return;
    grid[y][x] = grid[y][x] ? 0 : 1;
  };

  return (
    <P5Sketch
      draw={draw}
      setup={setup}
      mousePressed={mousePressed}
      mouseDragged={mousePressed}
    />
  );
};

export default Life;
