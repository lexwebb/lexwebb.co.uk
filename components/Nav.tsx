import React from "react";
import styles from "./Nav.module.scss";
import { RiSunLine, RiSunFill } from "react-icons/ri";
import { routes } from "../config/routes";
import Link from "next/link";
import useDarkMode from "use-dark-mode";

type Props = {
  tab: "home" | "cv" | "projects" | "contact";
};

function Nav({ tab }: Props) {
  const { value: isDarkMode, toggle } = useDarkMode();

  return (
    <div className={styles.navContainer}>
      <div className={styles.nav} data-animate="color">
        {Object.entries(routes).map(([path, route]) => (
          <Link href={path} key={path} aria-label={route.name}>
            <button>{React.createElement(route.icon, {})}</button>
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
