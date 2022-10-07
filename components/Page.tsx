import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";

type Props = {
  className?: string;
  name?: string;
};

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  name,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>
          {name ? `Lex Southin-Webb // ${name}` : "Lex Southin-Webb"}
        </title>
      </Head>
      {children}
    </motion.div>
  );
};

export default Page;
