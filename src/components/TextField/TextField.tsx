import React, { useState, useRef } from 'react';
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
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...rest
}) => {
  const inputId = id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const hasValue = currentValue !== '' && currentValue != null;
  const shouldFloatLabel = isFocused || hasValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputClasses = [styles.input, styles[variant], error && styles.error, className]
    .filter(Boolean)
    .join(' ');

  const fieldsetClasses = [styles.fieldset, error && styles.error].filter(Boolean).join(' ');

  const legendClasses = [styles.legend, shouldFloatLabel && styles.floating]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      <fieldset className={fieldsetClasses}>
        {label && <legend className={legendClasses}>{label}</legend>}
        <input
          ref={inputRef}
          id={inputId}
          className={inputClasses}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={!shouldFloatLabel ? label : undefined}
          {...rest}
        />
      </fieldset>
    </div>
  );
};

export default TextField;
