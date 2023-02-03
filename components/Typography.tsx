import classNames from "classnames";
import React, { PropsWithChildren } from "react";

import { TypographyAs } from "./types";
import styles from "./Typography.module.scss";

export type TypographyProps = {
  as: TypographyAs;
  size?: "extraSmall" | "small" | "medium" | "large" | "custom";
  className?: string;
};

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  as,
  size = "medium",
  className,
  children,
}) => {
  const Tag = as;
  return (
    <Tag className={classNames(styles.typography, styles[size], className)}>
      {children}
    </Tag>
  );
};

export default Typography;
