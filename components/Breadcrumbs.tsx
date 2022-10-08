import React from "react";
import styles from "./Breadcrumbs.module.scss";
import { useCrumbs } from "../contexts/CrumbContext";
import classNames from "classnames";
import Link from "next/link";

interface Props {
  className?: string;
}

const Breadcrumbs: React.FC<Props> = ({ className }) => {
  const { crumbs } = useCrumbs();

  if (crumbs.length <= 1) return null;

  return (
    <div
      className={classNames(styles.container, className)}
      data-animate="color"
    >
      <span className={styles.cursor} data-animate="color">
        &gt;
      </span>
      {crumbs.slice(0, crumbs.length - 1).map((crumb, index) => (
        <div key={index} className={styles.linkContainer}>
          <Link href={crumb.path}>
            <a>{crumb.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
