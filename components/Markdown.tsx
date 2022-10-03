import Link from "next/link";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Markdown.module.scss";
import fs from "fs";

type Props = {
  markdown: string;
};

const Markdown: React.FC<Props> = ({ markdown }) => {
  return (
    <ReactMarkdown
      className={styles.container}
      components={{
        a: ({ node, ...props }) => {
          if (props.href?.startsWith("/"))
            return (
              <Link href={props.href}>
                <a>{props.children}</a>
              </Link>
            );

          // eslint-disable-next-line jsx-a11y/anchor-has-content
          return <a target="_blank" rel="noopener noreferrer" {...props} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
