import React, { FC, ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  padding?: string;
  direction?: 'horizontal' | 'vertical';
  alignment?: string;
}

const Container: FC<ContainerProps> = ({ children, padding = '10px 12px', direction = 'horizontal', alignment='center' }) => {
  return (
    <div 
      className={styles.container} 
      style={{ padding, flexDirection: direction === 'horizontal' ? 'row' : 'column', alignItems: alignment }}
    >
      {children}
    </div>
  );
};

export default Container;