import React from "react";

import Button from "./Button";
import Input from "./Input";
import styles from "./SketchControls.module.scss";

interface Control {
  label: string;
  name: string;
  type: "number";
  value: number | boolean;
}

type Props = {
  controls: Control[];
};

const SketchControls: React.FC<Props> = ({ controls }) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {controls.map((control) => (
          <Input
            key={control.name}
            name={control.name}
            label={control.label}
            type={control.type}
          />
        ))}
      </div>
      <Button>Regenerate</Button>
    </div>
  );
};

export default SketchControls;
