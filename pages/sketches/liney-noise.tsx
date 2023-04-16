import { NextPage } from "next";
import React from "react";

import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import LineyNoiseSketch from "../../components/sketches/lineyNoise";

const Life: NextPage = () => {
  return (
    <Page name="Life">
      <SketchContainer height={500} width={1000}>
        <LineyNoiseSketch />
      </SketchContainer>
    </Page>
  );
};

export default Life;
