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
}) => {
  const { user, login } = useAuth();
  const sizeClass = size === 'large' ? styles.large : styles.small;
  const colorClass = {
    normal: styles.normal,
    pale: styles.pale,
  }[color] || styles.normal;
  const ghostClass = ghost ? styles.ghost : "";

  function onRegistrationClick() {
    if(!user) {
      login();
    }
  }

  //if this is a registration button while the user is signed in, yet no text and href were given when its a registration button,
  if(isRegistrationButton && user && textIfAuthenticated == null && hrefIfAuthenticated == null) return <></>

  return href ? (
    <Link className={`${styles.button} ${sizeClass} ${colorClass} ${ghostClass}`}href={hrefIfAuthenticated ?? href} passHref>
      {user && textIfAuthenticated ? textIfAuthenticated : children}
    </Link>
  ) : (
    <button
      type={type}
      className={`${styles.button} ${sizeClass} ${colorClass} ${ghostClass}`}
      onClick={isRegistrationButton ? onRegistrationClick : onClick}
    >
      {user && textIfAuthenticated ? textIfAuthenticated : children}
    </button>
  );
};

export default Button;