import React from "react";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
  text: string;
};

export const CustomTooltip = ({ children, text }: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div className={styles.customTooltip}>{text}</div>}
    </div>
  );
};
