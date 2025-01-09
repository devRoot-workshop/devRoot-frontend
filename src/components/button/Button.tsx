import React, { FC } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  size?: 'small' | 'large';
  color?: 'normal' | 'pale';
  type?:  "button" | "submit" | "reset" | undefined;
  ghost?: true | false;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  size = 'large',
  color = 'normal',
  type = 'button',
  ghost = false,
  children,
  onClick,
}) => {
  const sizeClass = size === 'large' ? styles.large : styles.small;
  const colorClass = {
    normal: styles.normal,
    pale: styles.pale,
  }[color] || styles.normal;
  const ghostClass = ghost ? styles.ghost : "";

  return (
    <button type={type} className={`${styles.button} ${sizeClass} ${colorClass} ${ghostClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
