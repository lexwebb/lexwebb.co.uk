import fs from "fs";

import { NextPage } from "next";
import React from "react";

import Markdown from "../../../components/Markdown";
import Page from "../../../components/Page";
import YoutubeCard from "../../../components/YoutubeCard";
import { trpc } from "../../../utils/trpc";

interface Props {
  markdown: string;
}

const TheIntrepid: NextPage<Props> = ({ markdown }) => {
  const videos = trpc.youtube.getUploads.useQuery();
  const notShorts = videos.data?.items?.filter((v) => v.snippet?.description);

  const latestVideo = notShorts?.[0];
  return (
    <Page name="The Intrepid">
      <Markdown
        markdown={markdown}
        embed={{
          latestVideo: <YoutubeCard video={latestVideo} />,
        }}
      />
    </Page>
  );
};

export async function getStaticProps() {
  return {
    props: {
      markdown: fs.readFileSync(
        "copy/games/the-intrepid-introduction.md",
        "utf8"
      ),
    },
  };
}

export default TheIntrepid;
