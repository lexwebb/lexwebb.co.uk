import { NextPage } from "next";
import React from "react";

import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import PetrosSketch from "../../components/sketches/Petros";

const Petros: NextPage = () => {
  return (
    <Page name="Petros">
      <SketchContainer height={500}>
        <PetrosSketch />
      </SketchContainer>
    </Page>
  );
};

export default Petros;
