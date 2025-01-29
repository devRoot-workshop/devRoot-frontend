import styles from "./Console.module.css"

interface ConsoleDisplayProps {
    text: string;
}
  
export default function ConsoleDisplay({ text }: ConsoleDisplayProps) {
    if (!text) return null;
    
    return (
      <div className={styles.consoleContainer}>
        <h3 className="mt-4 font-semibold">Kimenet</h3>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg">
            {text}
        </pre>
      </div>
    );
  }