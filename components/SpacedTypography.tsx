import classNames from "classnames";
import React from "react";

import styles from "./SpacedTypography.module.scss";
import Typography, { TypographyProps } from "./Typography";

type Props = {
  children: string;
};

const SpacedTypography: React.FC<Props & TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Typography className={classNames(styles.container, className)} {...props}>
      {children.split("").map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </Typography>
  );
};

export default SpacedTypography;
