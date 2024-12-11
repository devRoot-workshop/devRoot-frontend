import Timer from "@/components/boxes/Timer/Timer";
import CodeHighlighter from "@/components/boxes/Code/CodeHighlighter";
import styles from "./page.module.css";

export default function ExercisePage() {
  const codeSnippet = `
  using System;
  using System.IO;
  using System.Linq;
  
  class Program {
    static void Main(string[] args) {
      string inputFile = "input.txt";
      string outputFile = "output.txt";
  
      try {
        var words = File.ReadAllLines(inputFile);
        var sortedWords = words.OrderBy(word => word).ToArray();
        File.WriteAllLines(outputFile, sortedWords);
  
        Console.WriteLine("A szavakat ábécé sorrendbe rendeztük!");
      } catch (FileNotFoundException) {
        Console.WriteLine("A bemeneti fájl nem található.");
      } catch (Exception ex) {
        Console.WriteLine($"Hiba történt: {ex.Message}");
      }
    }
  }`;

  return (
    <div className={styles.exercisePage}>
      <Timer />

      {/* Main Content */}
      <main>
        {/* Left Panel: Exercise Description */}
        <section className={styles.leftPanel}>
          <div>
            <h2 className={styles.title}>Feladat leírás:</h2>
            <br />
            <p className={styles.description}>
              Írj egy függvényt, amely bemenetként kap egy szöveges fájlt (vagy egy
              sztringet), amely soronként különböző szavakat tartalmaz. A függvény
              rendezze ezeket a szavakat ábécé sorrendbe, és írja ki az eredményt egy
              új fájlba!
            </p>
          </div>
          <div id="console-container">
            <h3 className="mt-4 font-semibold">Console</h3>
            <div>
              <pre className={`${styles.console} bg-gray-900 text-green-400 p-4 rounded-lg`}>
                {`
  alma
  banán
  körte
  szilva
                `}
              </pre>
            </div>
          </div>
        </section>

        {/* Right Panel: Code Editor */}
        <section className={styles.rightPanel}>
          <h2 className={`text-lg font-bold`}>C# Példa</h2>
          <div id="solution">
            <CodeHighlighter code={codeSnippet} language="csharp" />
          </div>
        </section>
      </main>
    </div>
  );
}