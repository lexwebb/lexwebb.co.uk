import fs from "fs";

import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { RiLinkedinBoxFill } from "react-icons/ri";

import Markdown from "../components/Markdown";
import Page from "../components/Page";
import GithubIcon from "../icons/GithubIcon";
import styles from "../styles/Home.module.scss";

interface Props {
  markdown: string;
}

const Home: NextPage<Props> = ({ markdown }) => {
  return (
    <Page className={styles.container}>
      <div className={styles.image}>
        <Image
          src="/me.png"
          alt="Lex's Face"
          layout="intrinsic"
          width={400}
          height={400}
        />
      </div>
      <div className={styles.links}>
        <a href="https://github.com/lexwebb">
          <GithubIcon />
          Github // lexwebb
        </a>
        <a href="https://www.linkedin.com/in/lex-southin-webb-76b582103/">
          <RiLinkedinBoxFill />
          Linkedin // Lex Southin-Webb
        </a>
      </div>
      <div className={styles.about}>
        <Markdown markdown={markdown} />
      </div>
    </Page>
  );
};

export async function getStaticProps() {
  return { props: { markdown: fs.readFileSync("copy/about.md", "utf8") } };
}

export default Home;
