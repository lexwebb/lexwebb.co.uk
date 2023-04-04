import { NextPage } from "next";
import React from "react";

import ListPage from "../../components/ListPage";
import { ListItem } from "../../types";

const games: ListItem[] = [
  {
    title: "The Intrepid",
    route: "/games/the-intrepid",
    description: "A Sci-fi horror game",
  },
];

const Games: NextPage = () => {
  return (
    <ListPage
      title="Games"
      description="Game development projects"
      routes={games}
    />
  );
};

export default Games;
