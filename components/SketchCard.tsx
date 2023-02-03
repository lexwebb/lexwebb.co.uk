import Link from "next/link";
import React from "react";
import { TiArrowRightThick } from "react-icons/ti";

import { Sketch } from "../types";
import Button from "./Button";
import Card from "./Card";
import styles from "./SketchCard.module.scss";
import Typography from "./Typography";

type Props = {
  sketch: Sketch;
};

const SketchCard: React.FC<Props> = ({ sketch }) => {
  return (
    <Link href={sketch.route} className={styles.cardLink}>
      <Button>
        <div>
          <Typography as="h1" size="large">
            {sketch.title}
          </Typography>
          <Typography as="p" size="small">
            {sketch.description}
          </Typography>
        </div>
        <TiArrowRightThick />
      </Button>
    </Link>
  );
};

export default SketchCard;
