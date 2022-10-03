import React from "react";
import Typography from "./Typography";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header} data-animate="color">
      <Typography as="h1">
        {"LEX SOUTHIN-WEBB".split("").map((letter, index) => (
          <span key={index} className={styles.letter}>
            {letter}
          </span>
        ))}
      </Typography>
    </div>
  );
};

export default Header;
