import { NextPage } from "next";
import React from "react";

import Page from "../components/Page";
import Typography from "../components/Typography";
import styles from "../styles/FourOhFour.module.scss";

const FourOhFour: NextPage = () => {
  return (
    <Page name="404" className={styles.container}>
      <Typography as="h1" size="huge">
        404
      </Typography>
      <Typography as="h2">The prince is in another castle</Typography>
    </Page>
  );
};

export default FourOhFour;
