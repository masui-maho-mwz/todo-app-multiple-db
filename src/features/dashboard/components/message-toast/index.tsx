import styles from './styles.module.css';

type Props = {
  data: { color: 'success'; message: string } | null;
};

export const MessageToast = ({ data }: Props) => {
  if (!data) return null;

  return (
    <div className={`${styles.root} ${styles[data.color]}`}>{data.message}</div>
  );
};
