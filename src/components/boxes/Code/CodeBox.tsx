"use client";

import React, { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Import a theme
import styles from "./CodeBox.module.css"; // Import the CSS module

// Optional: Register a specific language (like C#)
import csharp from "highlight.js/lib/languages/csharp";
hljs.registerLanguage("csharp", csharp);

interface CodeBoxProps {
  code: string; // Code string to display
  language: string;
}

const CodeBox: React.FC<CodeBoxProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // Apply syntax highlighting
    }
  }, [code, language]);

  const toggleCodeVisibility = () => {
    setIsCodeVisible((prev) => !prev);
  };

  return (
    <div className={styles.codeBoxContainer}>
      <button
        onClick={toggleCodeVisibility}
        className={`${styles.toggleButton}`}
      >
        {isCodeVisible ? "Hide Code" : "Show Code"}
      </button>
      <div
        className={`${styles.codeContainer} ${
          isCodeVisible ? styles.codeVisible : styles.codeBlurred
        }`}
      >
        <pre>
          <code ref={codeRef} className={language}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBox;
