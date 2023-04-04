import React from "react";

import ListItemCard from "./ListItemCard";
import styles from "./ListPage.module.scss";
import Page from "./Page";
import Typography from "./Typography";

type ListItem = {
  title: string;
  route: string;
  description: string;
};

type Props = {
  title: string;
  description: string;
  routes: ListItem[];
};

const ListPage: React.FC<Props> = ({ title, description, routes }) => {
  return (
    <Page name={title} className={styles.container}>
      <Typography as="h1" size="large">
        {title}
      </Typography>
      <Typography as="p" size="medium">
        {description}
      </Typography>
      {routes.map((listItem, key) => (
        <ListItemCard sketch={listItem} key={key} />
      ))}
    </Page>
  );
};

export default ListPage;
