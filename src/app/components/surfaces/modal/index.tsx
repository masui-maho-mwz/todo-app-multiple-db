import React from "react";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

export const Modal = ({ children, isOpen }: Props) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
