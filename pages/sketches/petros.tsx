import fs from "fs";

import { NextPage } from "next";
import React from "react";

import Markdown from "../../components/Markdown";
import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import SketchControls from "../../components/SketchControls";
import PetrosSketch from "../../components/sketches/Petros";

interface Props {
  markdown: string;
}

const Petros: NextPage<Props> = ({ markdown }) => {
  return (
    <Page name="Petros">
      <SketchContainer height={500}>
        <PetrosSketch />
        <SketchControls
          controls={[
            {
              label: "Floors",
              name: "floors",
              type: "number",
              max: 7,
              min: 2,
              initialValue: 5,
            },
          ]}
          regenerateText="Make me a house"
        />
      </SketchContainer>
      <Markdown markdown={markdown} />
    </Page>
  );
};

export async function getStaticProps() {
  return {
    props: { markdown: fs.readFileSync("copy/sketches/petros.md", "utf8") },
  };
}

export default Petros;
