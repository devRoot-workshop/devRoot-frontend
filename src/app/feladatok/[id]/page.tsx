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
      <main className={`${styles.grid} ${styles.gridCols2} ${styles.gap4} ${styles.p6}`}>
        {/* Left Panel: Exercise Description */}
        <section className={styles.leftPanel}>
          <div>
            <h2>Feladat leírás:</h2>
            <br />
            <p>
              Írj egy függvényt, amely bemenetként kap egy szöveges fájlt (vagy egy
              sztringet), amely soronként különböző szavakat tartalmaz. A függvény
              rendezze ezeket a szavakat ábécé sorrendbe, és írja ki az eredményt egy
              új fájlba!
            </p>
          </div>
          <div id="console_fasztudja">
            <h3 className={`${styles.mt4} ${styles.fontSemibold}`}>Console</h3>
            <div>
              <pre className={`${styles.console} ${styles.bgGray900} ${styles.textGreen400} ${styles.p4} ${styles.roundedLg}`}>
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
          <h2 className={`${styles.textLg} ${styles.fontBold}`}>C# Példa</h2>
          <div id="megoldas">
            <CodeHighlighter code={codeSnippet} language="csharp" />
          </div>
        </section>
      </main>
    </div>
  );
}