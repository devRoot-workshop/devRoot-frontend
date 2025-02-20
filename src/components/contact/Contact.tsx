import React from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  return (
    <div className={styles.contactSection}>
      <h2>Kapcsolat</h2>
      <p>Email: <a href="mailto:info@devroot.hu">info@devroot.hu</a></p>
      <p>Telefon: <a href="tel:+36123456789">+36 1 234 5678</a></p>
      <div>
        <a href="https://discord.gg/d9n7wydkHu" target="_blank" rel="noopener noreferrer">Discord</a>
        <a href="https://github.com/devRoot-workshop" target="_blank" rel="noopener noreferrer">Github</a>
        <a href="https://linkedin.com/company/devroot" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
};

export default Contact;