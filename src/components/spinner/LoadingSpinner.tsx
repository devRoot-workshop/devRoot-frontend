"use client"

import React from 'react';
import styles from './LoadingSpinner.module.css';
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
        <Image src={"/rat_running.gif"} alt='Loading' width={96} height={96}/>
    </div>
  );
};

export default LoadingSpinner;