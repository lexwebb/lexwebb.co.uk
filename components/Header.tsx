import React from "react";

import styles from "./Header.module.scss";
import SpacedTypography from "./SpacedTypography";

const Header = () => {
  return (
    <div className={styles.header} data-animate="color">
      <SpacedTypography as="h1">LEX SOUTHIN-WEBB</SpacedTypography>
    </div>
  );
};

export default Header;
