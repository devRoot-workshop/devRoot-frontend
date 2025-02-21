"use client"

import React, { FC } from 'react';
import styles from './button.module.css';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

interface ButtonProps {
  size?: 'small' | 'large';
  color?: 'normal' | 'pale';
  type?: "button" | "submit" | "reset" | undefined;
  ghost?: true | false;
  isRegistrationButton?: true | false;
  textIfAuthenticated?: string | null;
  hrefIfAuthenticated?: string | null;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  size = 'large',
  color = 'normal',
  type = 'button',
  ghost = false,
  isRegistrationButton = false,
  textIfAuthenticated,
  hrefIfAuthenticated,
  href,
  children,
  onClick,
  className = "",
}) => {
  const { user, login } = useAuth();
  const sizeClass = size === 'large' ? styles.large : styles.small;
  const colorClass = {
    normal: styles.normal,
    pale: styles.pale,
  }[color] || styles.normal;
  const ghostClass = ghost ? styles.ghost : "";

  function onRegistrationClick() {
    if (!user) {
      login();
    }
  }

  if (isRegistrationButton && user && textIfAuthenticated == null && hrefIfAuthenticated == null) return <></>;

  const combinedClassName = `${styles.button} ${sizeClass} ${colorClass} ${ghostClass} ${className}`.trim();

  return href ? (
    <Link className={combinedClassName} href={hrefIfAuthenticated ?? href} passHref>
      {user && textIfAuthenticated ? textIfAuthenticated : children}
    </Link>
  ) : (
    <button
      type={type}
      className={combinedClassName}
      onClick={isRegistrationButton ? onRegistrationClick : onClick}
    >
      {user && textIfAuthenticated ? textIfAuthenticated : children}
    </button>
  );
};

export default Button;
