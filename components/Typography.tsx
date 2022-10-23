import classNames from "classnames";
import React, { PropsWithChildren } from "react";

import styles from "./Typography.module.scss";

type Props = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "label";
  size?: "extraSmall" | "small" | "medium" | "large" | "custom";
  className?: string;
  for?: string;
};

const Typography: React.FC<PropsWithChildren<Props>> = ({
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
