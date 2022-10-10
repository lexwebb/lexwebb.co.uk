import React, { createContext, useContext } from "react";
import { useElementSize } from "usehooks-ts";

import styles from "./SketchContainer.module.scss";

type Props = {
  width?: number;
  height?: number;
};

const SketchContainerContext = createContext<Required<Props>>(
  null as unknown as Required<Props>
);

export const useSketchSize = () => useContext(SketchContainerContext);

const SketchContainer: React.FC<React.PropsWithChildren<Props>> = ({
  width,
  height,
  children,
}) => {
  const [ref, size] = useElementSize<HTMLDivElement>();
  return (
    <div ref={ref} className={styles.container}>
      <SketchContainerContext.Provider
        value={{ width: width || size.width, height: height || size.height }}
      >
        {children}
      </SketchContainerContext.Provider>
    </div>
  );
};

export default SketchContainer;
