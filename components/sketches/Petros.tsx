import P5 from "p5"; //Import this for typechecking and intellisense
import React from "react";

import P5Sketch from "../P5Sketch";

const x = 50;
const y = 50;

const Petros: React.FC = () => {
  const draw = (p5: P5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
  };

  return <P5Sketch draw={draw} />;
};

export default Petros;
