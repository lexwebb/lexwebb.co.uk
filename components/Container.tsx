import classNames from "classnames";
import React, { PropsWithChildren, forwardRef } from "react";
import styles from "./Container.module.scss";

type Props = {
  className?: string;
};

const Container = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  function Container({ children, className, ...props }, ref) {
    return (
      <div
        className={classNames(styles.container, className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default Container;
