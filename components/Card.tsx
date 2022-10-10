import React, { forwardRef, PropsWithChildren } from "react";
import Container from "./Container";
import styles from "./Card.module.scss";

type Props = {};

const Card = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(function Card(
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
