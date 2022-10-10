import Link from "next/link";
import React from "react";
import { Sketch } from "../types";
import Card from "./Card";
import Typography from "./Typography";
import styles from "./SketchCard.module.scss";

type Props = {
  sketch: Sketch;
};

const SketchCard: React.FC<Props> = ({ sketch }) => {
  return (
    <Link href={sketch.route}>
      <a className={styles.cardLink}>
        <Card>
          <Typography as="h1" size="large">
            {sketch.title}
          </Typography>
          <Typography as="p" size="medium">
            {sketch.description}
          </Typography>
        </Card>
      </a>
    </Link>
  );
};

export default SketchCard;
