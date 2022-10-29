import React, { useEffect } from "react";

import Button from "./Button";
import Input from "./Input";
import { useSketch } from "./SketchContainer";
import styles from "./SketchControls.module.scss";

interface Control {
  label: string;
  name: string;
  type: "number";
  initialValue: number;
  min?: number;
  max?: number;
}

type Props = {
  controls: Control[];
  regenerateText?: string;
};

const SketchControls: React.FC<Props> = ({ controls, regenerateText }) => {
  const { setParam, params, regenerate } = useSketch();

  useEffect(() => {
    controls.forEach(({ name, initialValue }) => {
      setParam(name, initialValue);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {controls.map((control) => (
          <Input
            key={control.name}
            {...control}
            value={params[control.name]}
            onChange={(value) => setParam(control.name, Number(value))}
          />
        ))}
      </div>
      <Button onClick={() => regenerate()}>
        {regenerateText || "Regenerate"}
      </Button>
    </div>
  );
};

export default SketchControls;
