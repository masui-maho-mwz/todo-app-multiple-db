import React from "react";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

export const Modal = ({ children }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
