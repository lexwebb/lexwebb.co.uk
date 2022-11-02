import P5 from "p5";

import { sequence } from "../utils";
import { Globals } from "./types";

export type Cloud = {
  x: number;
  y: number;
  points: P5.Vector[];
};

export const generateClouds = (p5: P5, globals: Globals): Cloud[] => {
  const clouds = p5.floor(p5.random(2, 5));
  const numClouds = sequence(clouds);

  return numClouds.map(() => ({
    x: p5.random(0, p5.width),
    y: p5.random(0, p5.height / 3),
    points: [
      p5.createVector(0, 5).add(p5.random(-3, 3)),
      p5.createVector(5, 2.5).add(p5.random(-3, 3)),
      p5.createVector(10, 0).add(p5.random(-3, 3)),
      p5.createVector(20, 0).add(p5.random(-3, 3)),
      p5.createVector(30, 0).add(p5.random(-3, 3)),
      p5.createVector(35, 2.5).add(p5.random(-3, 3)),
      p5.createVector(40, 5).add(p5.random(-3, 3)),
      p5.createVector(35, 7.5).add(p5.random(-3, 3)),
      p5.createVector(30, 10).add(p5.random(-3, 3)),
      p5.createVector(20, 10).add(p5.random(-3, 3)),
      p5.createVector(10, 10).add(p5.random(-3, 3)),
      p5.createVector(5, 7.5).add(p5.random(-3, 3)),
    ],
  }));
};

export const drawClouds = (p5: P5, clouds: Cloud[]) => {
  // p5.arc(20, 20, 10, 10, p5.PI + p5.TWO_PI, p5.TWO_PI);

  const angleBetween = (v1: P5.Vector, v2: P5.Vector) => {
    return p5.atan2(v2.y - v1.y, v2.x - v1.x);
  };

  p5.beginShape();
  clouds.forEach((cloud) => {
    cloud.points.forEach((point, i) => {
      const thisPoint = point.copy().mult(2);
      const nextPoint = (cloud.points[i + 1] || cloud.points[0]).copy().mult(2);

      const dist1 = thisPoint.dist(nextPoint) / 3;
      const angle1 = angleBetween(thisPoint, nextPoint) - 0.5;
      const vect1 = p5.createVector(p5.cos(angle1), p5.sin(angle1)).mult(dist1);
      const p1 = thisPoint.copy().add(vect1);

      const dist2 = nextPoint.dist(thisPoint) / 3;
      const angle2 = angleBetween(nextPoint, thisPoint) + 0.5;
      const vect2 = p5.createVector(p5.cos(angle2), p5.sin(angle2)).mult(dist2);
      const p2 = nextPoint.copy().add(vect2);

      p5.bezier(
        cloud.x + thisPoint.x,
        cloud.y + thisPoint.y,
        cloud.x + p1.x,
        cloud.y + p1.y,
        cloud.x + p2.x,
        cloud.y + p2.y,
        cloud.x + nextPoint.x,
        cloud.y + nextPoint.y
      );
    });
  });

  p5.endShape();
};
