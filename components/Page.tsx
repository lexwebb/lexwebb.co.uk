import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCrumbs } from "../contexts/CrumbContext";
import styles from "./Page.module.scss";
import classNames from "classnames";

type Props = {
  className?: string;
  name?: string;
};

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  name,
}) => {
  const router = useRouter();
  const { registerPage } = useCrumbs();

  useEffect(() => {
    if (router.asPath == "/") registerPage("Home", router.asPath);
    else if (name) registerPage(name, router.asPath);
  }, [name, registerPage, router, router.asPath]);

  return (
    <motion.div
      className={classNames(styles.container, className)}
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
