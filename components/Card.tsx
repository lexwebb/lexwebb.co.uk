import React, { PropsWithChildren, forwardRef } from "react";

import styles from "./Card.module.scss";
import Container from "./Container";

const Card = forwardRef<HTMLDivElement, PropsWithChildren>(function Card(
  { children },
  ref
) {
  return (
    <Container className={styles.container} ref={ref}>
      {children}
    </Container>
  );
});

export default Card;
