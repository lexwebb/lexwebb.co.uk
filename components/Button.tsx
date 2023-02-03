import classNames from "classnames";
import React from "react";

import styles from "./Button.module.scss";

type Props = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <button className={classNames(styles.button, className)} {...props}>
        {children}
      </button>
    </div>
  );
};

export default Button;
