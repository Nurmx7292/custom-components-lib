import React from 'react';
import styles from './TextField.module.scss';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  variant?: 'outlined';
  label?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  error = false,
  variant = 'outlined',
  label,
  className,
  id,
  ...rest
}) => {
  const inputId = id || `textfield-${Math.random().toString(36).substr(2, 9)}`;

  const inputClasses = [styles.input, styles[variant], error && styles.error, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input id={inputId} className={inputClasses} {...rest} />
    </div>
  );
};

export default TextField;
