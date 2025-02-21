import styles from "./Console.module.css"

interface ConsoleDisplayProps {
  title: string;
  text: string;
}
  
export default function ConsoleDisplay({ text, title }: ConsoleDisplayProps) {
    if (!text) return null;
    
    return (
      <div className={styles.consoleContainer}>
        <h3 className="font-semibold">{title}</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg">
            {text}
        </pre>
      </div>
    );
  }