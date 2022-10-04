import "../styles/globals.css";
import type { AppProps } from "next/app";

import styles from "../styles/_app.module.scss";

import Layout from "../components/Layout";
import useDarkMode from "use-dark-mode";
import React from "react";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { value } = useDarkMode();

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.app}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </div>
  );
}

export default MyApp;
