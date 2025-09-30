import React, { useState } from 'react';
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
  error?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  placeholder,
  className,
  id,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  error = false,
  multiple,
  children,
  ...rest
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const [isFocused, setIsFocused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [internalValue, setInternalValue] = useState((defaultValue as any) ?? (multiple ? [] : ''));

  const rawValue = value !== undefined ? value : internalValue;
  const hasValue = Array.isArray(rawValue)
    ? rawValue.length > 0
    : rawValue !== undefined &&
      rawValue !== null &&
      !(typeof rawValue === 'string' && rawValue === '');

  const currentValue = multiple
    ? hasValue
      ? Array.isArray(rawValue)
        ? rawValue
        : [rawValue]
      : []
    : hasValue
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rawValue as any)
      : '';

  const shouldFloatLabel = isFocused || hasValue;

  const selectClasses = [styles.select, className].filter(Boolean).join(' ');

  const fieldsetClasses = [styles.fieldset, error && styles.error].filter(Boolean).join(' ');

  const legendClasses = [styles.legend, shouldFloatLabel && styles.floating]
    .filter(Boolean)
    .join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
      if (value === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setInternalValue(values as any);
      }
      onChange?.(e);
      return;
    }

    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={styles.container}>
      <fieldset className={fieldsetClasses}>
        {label && <legend className={legendClasses}>{label}</legend>}
        <select
          id={selectId}
          className={selectClasses}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={currentValue as any}
          multiple={multiple}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        >
          {!multiple && !hasValue && label && (
            <option value="" disabled hidden>
              {isFocused ? '' : label}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
      </fieldset>
    </div>
  );
};

export default Select;
