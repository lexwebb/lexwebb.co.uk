import fs from "fs";

import { NextPage } from "next";
import Image from "next/legacy/image";
import React from "react";

import Markdown from "../../components/Markdown";
import Page from "../../components/Page";
import SketchContainer from "../../components/SketchContainer";
import SketchControls from "../../components/SketchControls";
import PetrosSketch from "../../components/sketches/Petros";
import styles from "../../styles/Petros.module.scss";

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
      <div className={styles.blurbContainer}>
        <div className={styles.blurbImage}>
          <Image
            src="/petros.png"
            alt="Petros Painting"
            layout="intrinsic"
            width={200}
            height={300}
          />
        </div>
        <Markdown markdown={markdown} />
      </div>
    </Page>
  );
};

export async function getStaticProps() {
  return {
    props: { markdown: fs.readFileSync("copy/sketches/petros.md", "utf8") },
  };
}

export default Petros;
