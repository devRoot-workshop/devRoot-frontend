import React from 'react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.contactSection}>
      <p>Email: <a href="mailto:info@devroot.hu">info@devroot.hu</a></p>
      <div className={styles.iconLinks}>
        <a href="https://discord.gg/d9n7wydkHu" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={32} />
        </a>
        <a href="https://github.com/devRoot-workshop" target="_blank" rel="noopener noreferrer">
          <FaGithub size={32} />
        </a>
      </div>
    </div>
  );
};

export default Footer;