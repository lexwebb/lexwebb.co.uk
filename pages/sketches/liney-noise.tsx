import { NextPage } from "next";
import React from "react";

import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import LineyNoiseSketch from "../../components/sketches/lineyNoise";

const LineyNoise: NextPage = () => {
  return (
    <Page name="Liney Noise">
      <SketchContainer height={500}>
        <LineyNoiseSketch />
      </SketchContainer>
    </Page>
  );
};

export default LineyNoise;
