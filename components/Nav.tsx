import Link from "next/link";
import React, { createElement } from "react";
import { RiSunFill, RiSunLine } from "react-icons/ri";
import useDarkMode from "use-dark-mode";

import { routes } from "../config/routes";
import styles from "./Nav.module.scss";

function Nav() {
  const { value: isDarkMode, toggle } = useDarkMode();

  return (
    <div className={styles.navContainer}>
      <div className={styles.nav} data-animate="color">
        {Object.entries(routes).map(([path, route]) => (
          <Link href={path} key={path} aria-label={route.name}>
            <button>{createElement(route.icon, {})}</button>
          </Link>
        ))}
        <span className={styles.divider} />
        <button onClick={toggle} aria-label="Toggle dark-mode">
          {isDarkMode ? <RiSunFill /> : <RiSunLine />}
        </button>
      </div>
    </div>
  );
}

export default Nav;
