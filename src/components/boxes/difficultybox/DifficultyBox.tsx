import React from 'react';
import styles from './DifficultyBox.module.css';

interface DifficultyBoxProps {
  difficulty: number;
}

const DifficultyBox: React.FC<DifficultyBoxProps> = ({ difficulty }) => {
  const levels = ['None', 'Easy', 'Normal', 'Hard'];

  return (
    <div className={styles.difficultyBox}>
      {levels.map((level, index) => (
        <div
          key={index}
          className={`${styles.level} ${difficulty === index ? styles.active : ''}`}
        >
          {level}
        </div>
      ))}
    </div>
  );
};

export default DifficultyBox;