import React from "react";
import styles from "./descriptionBox.module.css";

interface DescriptionBoxProps {
  width: string | number;
  height: string | number;
  url?: string;
  children?: React.ReactNode;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ width, height, url, children }) => {
  const inlineStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    backgroundImage: url ? `url(${url})` : undefined,
  };

  const boxContent = (
    <div className={styles.descriptionBox} style={inlineStyle}>
      {children}
      {url && <div className={styles.arrow}>&gt;</div>}
    </div>
  );

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.linkWrapper}>
      {boxContent}
    </a>
  ) : (
    boxContent
  );
};

export default DescriptionBox;
