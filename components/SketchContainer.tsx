import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "usehooks-ts";

import styles from "./SketchContainer.module.scss";

type Props = {
  width?: number;
  height?: number;
  params?: Record<string, number>;
  setParam: (name: string, value: number) => void;
  regenerate: () => void;
};

const SketchContainerContext = createContext<Required<Props>>(
  null as unknown as Required<Props>
);

export const useSketch = () => useContext(SketchContainerContext);

const SketchContainer: React.FC<
  React.PropsWithChildren<Pick<Props, "width" | "height">>
> = ({ width, height, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useResizeObserver({
    ref,
    box: "border-box",
  });
  const [params, setParams] = useState<Record<string, number>>({});

  const contextValue: Required<Props> = useMemo(
    () => ({
      width: width || size.width || 0,
      height: height || size.height || 0,
      params,
      setParam: (name, value) => setParams({ ...params, [name]: value }),
      regenerate: () => setParams({ ...params }),
    }),
    [height, params, size.height, size.width, width]
  );

  return (
    <div ref={ref} className={styles.container}>
      <SketchContainerContext.Provider value={contextValue}>
        {children}
      </SketchContainerContext.Provider>
    </div>
  );
};

export default SketchContainer;
