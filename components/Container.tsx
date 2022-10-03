import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styles from "./Container.module.scss";

type Props = {
  className?: string;
};

const Container: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
