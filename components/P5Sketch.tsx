import React from "react";
import P5 from "p5"; //Import this for typechecking and intellisense
import dynamic from "next/dynamic";
import { useSketchSize } from "./SketchContainer";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

interface ComponentProps {
  setup?: (p5: P5, canvasParentRef: Element) => void;
  draw: (p5: P5) => void;
}

const P5Sketch: React.FC<ComponentProps> = ({ setup, draw }) => {
  const { width, height } = useSketchSize();

  const defaultSetup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    setup && setup(p5, canvasParentRef);
  };

  const defaultDraw = (p5: P5) => {
    p5.resizeCanvas(width, height);
    draw(p5);
  };

  return <Sketch setup={defaultSetup} draw={defaultDraw} />;
};

export default P5Sketch;
