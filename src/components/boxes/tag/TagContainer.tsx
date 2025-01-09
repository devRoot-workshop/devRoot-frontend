import React, { FC, ReactNode } from 'react';
import styles from './TagContainer.module.css';

interface TagContainerProps {
  children: ReactNode;
}

const TagContainer: FC<TagContainerProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default TagContainer;
