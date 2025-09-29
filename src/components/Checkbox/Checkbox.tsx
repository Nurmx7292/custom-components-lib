import React from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  indeterminate = false,
  className,
  id,
  disabled = false,
  ...rest
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const containerClasses = [
    styles.container,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <input
        id={checkboxId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        {...rest}
      />
      <label htmlFor={checkboxId} className={styles.label}>
        <span className={styles.checkbox}>
          <span className={styles.checkmark} />
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
