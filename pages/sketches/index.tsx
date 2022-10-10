import React, { useMemo } from "react";

import Page from "../../components/Page";
import { NextPage } from "next";
import { Sketch } from "../../types";
import SketchCard from "../../components/SketchCard";
import { inDevEnvironment } from "../../devMode";

const sketches: (Sketch & { live: boolean })[] = [
  {
    title: "Petros",
    route: "/sketches/petros",
    description: "For my grandfather, artist and inspiration",
    live: false,
  },
];

interface Props {}

const Sketches: NextPage<Props> = () => {
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
