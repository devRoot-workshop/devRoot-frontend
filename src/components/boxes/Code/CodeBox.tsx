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

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // Apply syntax highlighting
    }
  }, [code, language]);


  return (
    <div
        className={`${styles.codeContainer}`}
      >
      <pre>
        <code ref={codeRef} className={language}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBox;
