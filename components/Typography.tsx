import classNames from "classnames";
import React, { PropsWithChildren } from "react";

import { TypographyAs } from "./types";
import styles from "./Typography.module.scss";

export type TypographyProps = {
  as: TypographyAs;
  size?: "extraSmall" | "small" | "medium" | "large" | "extraLarge" | "custom";
  weight?: "light" | "regular" | "medium" | "bold";
  className?: string;
};

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  as,
  size = "medium",
  weight = "regular",
  className,
  children,
}) => {
  const Tag = as;
  return (
    <Tag
      className={classNames(
        styles.typography,
        styles[size],
        styles[weight],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
