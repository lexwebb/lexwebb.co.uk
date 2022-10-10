import classNames from "classnames";
import React from "react";
import useDarkMode from "use-dark-mode";

import Breadcrumbs from "./Breadcrumbs";
import Container from "./Container";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Nav from "./Nav";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { value: isDarkMode } = useDarkMode();

  return (
    <div
      className={classNames(
        styles.page,
        isDarkMode ? styles.darkMode : styles.lightMode
      )}
    >
      <div className={styles.mainContainer}>
        <Header />
        <Container className={styles.content} data-animate="color">
          <Nav />
          <div className={styles.innerContent}>
            <Breadcrumbs />
            <section>{children}</section>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
