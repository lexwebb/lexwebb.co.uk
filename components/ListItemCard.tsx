import Link from "next/link";
import React from "react";
import { TiArrowRightThick } from "react-icons/ti";

import { ListItem } from "../types";
import Button from "./Button";
import styles from "./ListItemCard.module.scss";
import Typography from "./Typography";

type Props = {
  sketch: ListItem;
};

const ListItemCard: React.FC<Props> = ({ sketch: listItem }) => {
  return (
    <Link href={listItem.route} className={styles.cardLink}>
      <Button>
        <div>
          <Typography as="h1" size="large">
            {listItem.title}
          </Typography>
          <Typography as="p" size="small">
            {listItem.description}
          </Typography>
        </div>
        <TiArrowRightThick />
      </Button>
    </Link>
  );
};

export default ListItemCard;
