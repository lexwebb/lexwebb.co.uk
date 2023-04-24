import { NextPage } from "next";
import React from "react";

import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import LifeSketch from "../../components/sketches/life";

const Life: NextPage = () => {
  return (
    <Page name="Life">
      <SketchContainer height={500}>
        <LifeSketch />
      </SketchContainer>
    </Page>
  );
};

export default Life;
