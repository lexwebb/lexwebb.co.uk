import React from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
};

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Page;
