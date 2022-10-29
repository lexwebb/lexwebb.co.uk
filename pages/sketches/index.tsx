import { NextPage } from "next";
import React from "react";

import Page from "../../components/Page";
import SketchCard from "../../components/SketchCard";
import { inDevEnvironment } from "../../devMode";
import { Sketch } from "../../types";

const sketches: (Sketch & { live: boolean })[] = [
  {
    title: "Petros",
    route: "/sketches/petros",
    description: "For my grandfather, artist and inspiration",
    live: true,
  },
];

const Sketches: NextPage = () => {
  const liveSketches = sketches.filter((s) =>
    inDevEnvironment ? true : s.live
  );

  if (liveSketches.length === 0) {
    return (
      <Page name="Sketches">
        <p>Nothing here yet!</p>
      </Page>
    );
  }

  return (
    <Page name="Sketches">
      {liveSketches.map((sketch, key) => (
        <SketchCard sketch={sketch} key={key} />
      ))}
    </Page>
  );
};

export default Sketches;
