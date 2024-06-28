import styles from "./styles.module.css";

export const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
};
