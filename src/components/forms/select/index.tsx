import React from 'react';
import styles from './styles.module.css';

type Option = {
  key: string;
  name: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export const Select = ({ options, value, onChange, placeholder }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange} className={styles.root}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
