import "../styles/globals.css";
import type { AppProps } from "next/app";

import styles from "../styles/_app.module.scss";

import Layout from "../components/Layout";
import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CrumbContextProvider, useCrumbs } from "../contexts/CrumbContext";
import { routes } from "../config/routes";

const MountedProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = <>{children}</>;

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

const RouteChangeHandler: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { addCrumb, currentPage, resetCrumbs } = useCrumbs();

  useEffect(() => {
    if (currentPage) {
      if (routes[currentPage.path]) {
        resetCrumbs();
      }
      addCrumb(currentPage.name, currentPage.path);
    }
  }, [addCrumb, currentPage, resetCrumbs]);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.app}>
      <MountedProvider>
        <CrumbContextProvider>
          <RouteChangeHandler>
            <Layout>
              <AnimatePresence exitBeforeEnter initial={false}>
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </RouteChangeHandler>
        </CrumbContextProvider>
      </MountedProvider>
    </div>
  );
}

export default MyApp;
