import React, { useEffect, useRef } from 'react';
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
  onChange,
  ...rest
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  const containerClasses = [styles.container, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e);
  };

  return (
    <div className={containerClasses}>
      <input
        ref={inputRef}
        id={checkboxId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        onChange={handleChange}
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
