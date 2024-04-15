import React from "react";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

export const Modal = ({ children }: Props) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};
