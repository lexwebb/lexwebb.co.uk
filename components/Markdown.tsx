import Link from "next/link";
import React, { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import styles from "./Markdown.module.scss";

type Props = {
  markdown: string;
  embed?: Record<string, ReactElement>;
};

const Markdown: React.FC<Props> = ({ markdown, embed }) => {
  return (
    <ReactMarkdown
      className={styles.container}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ node: _, ...props }) => {
          if (props.href?.startsWith("/"))
            return <Link href={props.href}>{props.children}</Link>;

          return <a target="_blank" rel="noopener noreferrer" {...props} />;
        },
        embed: ({ node: _, ...props }) => {
          const { id } = props;
          if (!embed || !id) return null;
          return embed[id];
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
