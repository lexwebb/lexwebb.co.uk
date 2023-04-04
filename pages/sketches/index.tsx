import { NextPage } from "next";
import React from "react";

import ListPage from "../../components/ListPage";
import Page from "../../components/Page";
import { inDevEnvironment } from "../../devMode";
import { ListItem } from "../../types";

const sketches: (ListItem & { live: boolean })[] = [
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
    <ListPage
      title="Sketches"
      description="A collection of sketches and experiments"
      routes={liveSketches}
    />
  );
};

export default Sketches;
