import React from "react";

type Props = {
  className?: string;
};

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={className}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
    >
      {children}
    </div>
  );
};

export default Page;
