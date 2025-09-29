import React from 'react';
import styles from './Switch.module.scss';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary';
  className?: string;
  id?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  size = 'medium',
  color = 'primary',
  className,
  id,
  ...rest
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [styles.container, disabled && styles.disabled, className]
    .filter(Boolean)
    .join(' ');

  const switchClasses = [styles.switch, styles[size], styles[color], checked && styles.checked]
    .filter(Boolean)
    .join(' ');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(event.target.checked);
    }
  };

  return (
    <div className={containerClasses}>
      <input
        id={switchId}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      <label htmlFor={switchId} className={styles.label}>
        <span className={switchClasses}>
          <span className={styles.thumb} />
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    </div>
  );
};

export default Switch;
