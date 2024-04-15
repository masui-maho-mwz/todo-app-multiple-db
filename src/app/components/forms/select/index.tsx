import styles from "./styles.module.css";

type Option = {
  id: string;
  name: string;
};

type Props<T extends Option> = {
  options: T[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const Select = <T extends Option>({
  options,
  value,
  onChange,
  placeholder,
}: Props<T>) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className={styles.select}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
