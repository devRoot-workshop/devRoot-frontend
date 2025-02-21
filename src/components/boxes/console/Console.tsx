import styles from "./Console.module.css"

interface ConsoleDisplayProps {
  title: string;
  text: string;
}

export default function ConsoleDisplay({ text, title }: ConsoleDisplayProps) {
  if (!text) return null;
  
  return (
    <div className={styles.consoleContainer}>
      <h3 className={styles.title}>{title}</h3>
      <pre className="text-green-400 p-4 rounded-lg">
        {text}
      </pre>
    </div>
  );
}
