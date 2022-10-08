import React from "react";
import styles from "./Layout.module.scss";
import Container from "./Container";
import Nav from "./Nav";
import classNames from "classnames";
import Header from "./Header";
import useDarkMode from "use-dark-mode";
import Breadcrumbs from "./Breadcrumbs";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { value: isDarkMode } = useDarkMode();

  const tab = "home";
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
          <Nav tab={tab} />
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
