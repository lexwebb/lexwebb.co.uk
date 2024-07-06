import fs from "fs";

import { NextPage } from "next";
import Image from "next/legacy/image";
import React from "react";
import { RiLinkedinBoxFill, RiYoutubeFill } from "react-icons/ri";

import Markdown from "../components/Markdown";
import Page from "../components/Page";
import GithubIcon from "../icons/GithubIcon";
import styles from "../styles/Home.module.scss";
import Typography from "../components/Typography";

interface Props {
  markdown: string;
}

const Home: NextPage<Props> = ({ markdown }) => {
  return (
    <Page className={styles.container}>
      <div className={styles.image}>
        <Image
          src="/me.jpeg"
          alt="Lex's Face"
          layout="intrinsic"
          width={400}
          height={400}
        />
      </div>
      <div className={styles.links}>
        <div className={styles.linkRootDash} />
        <div className={styles.linkDashContainer}>
          <div className={styles.linkDash} />
          <div className={styles.linkDash} />
          <div className={styles.linkDash} />
        </div>
        <div className={styles.linksInner}>
          <a href="https://github.com/lexwebb">
            <GithubIcon />
            <Typography
              as="span"
              size="custom"
              weight="bold"
              className={styles.linkText}
            >
              Github // lexwebb
            </Typography>
          </a>
          <a href="https://www.linkedin.com/in/lex-southin-webb-76b582103/">
            <RiLinkedinBoxFill style={{ color: "#0077B5" }} />
            <Typography
              as="span"
              size="custom"
              weight="bold"
              className={styles.linkText}
            >
              Linkedin // Lex Southin-Webb
            </Typography>
          </a>
          <a href="https://www.youtube.com/@InfiniteBoxStudios">
            <RiYoutubeFill style={{ color: "#FF0000" }} />
            <Typography
              as="span"
              size="custom"
              weight="bold"
              className={styles.linkText}
            >
              Youtube // Infinite Box Studios
            </Typography>
          </a>
        </div>
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
