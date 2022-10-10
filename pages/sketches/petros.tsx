import React from "react";

import Page from "../../components/Page";
import { NextPage } from "next";
import PetrosSketch from "../../components/sketches/Petros";
import SketchContainer from "../../components/SketchContainer";

interface Props {
  markdown: string;
}

const Petros: NextPage<Props> = ({ markdown }) => {
  return (
    <Page name="Petros">
      <SketchContainer height={300}>
        <PetrosSketch />
      </SketchContainer>
    </Page>
  );
};

export default Petros;
