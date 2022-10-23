import React, { HTMLInputTypeAttribute } from "react";

import styles from "./Input.module.scss";
import Typography from "./Typography";

type Props = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
};

const Input: React.FC<Props> = ({ label, type, name }) => {
  return (
    <div className={styles.container}>
      <Typography as="label" size="extraSmall" for={name}>
        {label}
      </Typography>
      <span>
        <span className={styles.cursor} data-animate="color">
          &gt;
        </span>
        <input name={name} id={name} type={type} />
      </span>
    </div>
  );
};

export default Input;
