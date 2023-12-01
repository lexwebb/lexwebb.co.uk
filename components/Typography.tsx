import classNames from "classnames";
import React, { PropsWithChildren } from "react";

import { TypographyAs } from "./types";
import styles from "./Typography.module.scss";

export type TypographyProps = {
  as: TypographyAs;
  size?:
    | "extraSmall"
    | "small"
    | "medium"
    | "large"
    | "extraLarge"
    | "custom"
    | "huge";
  weight?: "light" | "regular" | "medium" | "bold";
  className?: string;
  dropColor?: string;
};

const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  as,
  size = "medium",
  weight = "regular",
  className,
  children,
  dropColor,
  ...rest
}) => {
  const Tag = as;
  return (
    <Tag
      className={classNames(
        styles.typography,
        styles[size],
        styles[weight],
        dropColor && styles.drop,
        className
      )}
      data-text={children}
      style={
        {
          "--drop-color": dropColor,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Typography;
