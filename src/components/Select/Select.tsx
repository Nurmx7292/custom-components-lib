import React from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label,
  placeholder,
  className,
  id,
  children,
  ...rest
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const selectClasses = [
    styles.select,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={selectClasses}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
        {children}
      </select>
    </div>
  );
};

export default Select;
