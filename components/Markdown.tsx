import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

import styles from "./Markdown.module.scss";

type Props = {
  markdown: string;
};

const Markdown: React.FC<Props> = ({ markdown }) => {
  return (
    <ReactMarkdown
      className={styles.container}
      components={{
        a: ({ node: _, ...props }) => {
          if (props.href?.startsWith("/"))
            return (
              <Link href={props.href}>
                <a>{props.children}</a>
              </Link>
            );

          return <a target="_blank" rel="noopener noreferrer" {...props} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
