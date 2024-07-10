import styles from './styles.module.css';

type Props = {
  value: string;
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export const RoundTabs = ({ value, items, onChange }: Props) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <button
          key={item.value}
          className={`${styles.action} ${
            item.value === value ? styles.activeTab : ''
          }`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
