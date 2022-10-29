import React, { HTMLInputTypeAttribute } from "react";

import styles from "./Input.module.scss";
import Typography from "./Typography";

type Props = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  min?: number;
  max?: number;
  onChange?: (value: string | number) => void;
};

const Input: React.FC<Props> = ({
  label,
  type,
  name,
  value,
  min,
  max,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <Typography as="label" size="extraSmall" for={name}>
        {label}
      </Typography>
      <span>
        <span className={styles.cursor} data-animate="color">
          &gt;
        </span>
        <input
          name={name}
          id={name}
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </span>
    </div>
  );
};

export default Input;
