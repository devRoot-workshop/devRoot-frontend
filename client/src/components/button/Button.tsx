import React, { FC } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  size?: 'small' | 'big';
  type?: 'normal' | 'pale' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  size = 'big',
  type = 'normal',
  children,
  onClick,
}) => {
  const sizeClass = size === 'big' ? styles.big : styles.small;
  const typeClass = {
    normal: styles.normal,
    pale: styles.pale,
    ghost: styles.ghost,
  }[type] || styles.normal;

  return (
    <button className={`${styles.button} ${sizeClass} ${typeClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
