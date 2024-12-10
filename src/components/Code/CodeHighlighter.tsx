import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Import a theme

// Optional: Register a specific language (like C#)
import csharp from 'highlight.js/lib/languages/csharp';
hljs.registerLanguage('csharp', csharp);

interface CodeHighlighterProps {
  code: string; // Code string to display
  language: string; 
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current); // Apply syntax highlighting
    }
  }, [code, language]);

  return (
    <pre>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
