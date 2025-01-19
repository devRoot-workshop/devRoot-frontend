"use client"

import React, { FC } from 'react';
import styles from './TagComponent.module.css';

interface TagComponentProps {
  id: number;
  text: string;
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

const TagComponent: FC<TagComponentProps> = ({ id, text, setTags }) => {

  const handleTagRemove = () => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  };


  return (
    <div className={styles.tag}>
      {text}
      <button
        type="button"
        className={styles.removeButton}
        onClick={handleTagRemove}
        aria-label="Remove Tag"
      >
        &times;
      </button>

    </div>
  );
};

export default TagComponent;
