import React from "react";
import styles from "./styles.module.css";

type Option<T extends string> = {
  key: T;
  name: string;
};

type Props<T extends string> = {
  options: Option<T>[];
  value: T | "";
  onChange: (value: T | "") => void;
  placeholder: string;
};

export const Select = <T extends string>({
  options,
  value,
  onChange,
  placeholder
}: Props<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue =
      options.find((option) => option.name === e.target.value)?.key || "";
    onChange(newValue);
  };

  return (
    <select value={value} onChange={handleChange} className={styles.root}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
