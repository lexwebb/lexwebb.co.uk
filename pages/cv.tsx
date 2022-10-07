import Markdown from "../components/Markdown";
import React from "react";

import Page from "../components/Page";
import { NextPage } from "next";
import fs from "fs";

interface Props {
  markdown: string;
}

const CV: NextPage<Props> = ({ markdown }) => {
  return (
    <Page name="CV">
      <Markdown markdown={markdown} />
    </Page>
  );
};

export async function getStaticProps() {
  return { props: { markdown: fs.readFileSync("copy/cv.md", "utf8") } };
}

export default CV;
