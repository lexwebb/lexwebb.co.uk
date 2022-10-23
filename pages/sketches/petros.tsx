import { NextPage } from "next";
import React from "react";

import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import SketchControls from "../../components/SketchControls";
import PetrosSketch from "../../components/sketches/Petros";

const Petros: NextPage = () => {
  return (
    <Page name="Petros">
      <SketchContainer height={500}>
        <PetrosSketch />
      </SketchContainer>
      <SketchControls
        controls={[
          { label: "Max floors", name: "maxFloors", type: "number", value: 10 },
          { label: "Min floors", name: "minFloors", type: "number", value: 10 },
        ]}
      />
    </Page>
  );
};

export default Petros;
