import React, { FC } from 'react';
import styles from './TagComponent.module.css';

interface TagComponentProps {
  text: string;
  id: number;
  onRemove: (id: number) => void;
}

const TagComponent: FC<TagComponentProps> = ({ text, id, onRemove }) => {
  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className={styles.tag}>
      {text}
      <button type='button' className={styles.removeButton} onClick={handleRemove} aria-label="Remove Tag">
        &times;
      </button>
    </div>
  );
};

export default TagComponent;
