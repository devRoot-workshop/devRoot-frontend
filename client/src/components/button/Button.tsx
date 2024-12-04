import React, { FC } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  size?: 'small' | 'big';
  type?: 'normal' | 'pale';
  ghost?: true | false;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  size = 'big',
  type = 'normal',
  ghost = false,
  children,
  onClick,
}) => {
  const sizeClass = size === 'big' ? styles.big : styles.small;
  const typeClass = {
    normal: styles.normal,
    pale: styles.pale,
  }[type] || styles.normal;
  const ghostClass = ghost ? styles.ghost : "";

  return (
    <button className={`${styles.button} ${sizeClass} ${typeClass} ${ghostClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
