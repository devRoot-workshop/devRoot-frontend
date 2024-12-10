import Timer from "@/components/Timer/Timer";
import CodeHighlighter from "@/components/Code/CodeHighlighter";


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
      <div className="exercise-page">
        <Timer />
  
        {/* Main Content */}
        <main className="grid grid-cols-2 gap-4 p-6">
          {/* Left Panel: Exercise Description */}
          <section className="left_panel">
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
              <h3 className="mt-4 font-semibold">Console</h3>
              <div>
                <pre className="console bg-gray-900 text-green-400 p-4 rounded-lg">
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
          <section className="right_panel">
            <h2 className="text-lg font-bold">C# Példa</h2>
          <div id="megoldas"> 
            <CodeHighlighter code={codeSnippet} language="csharp" />
          
          </div>
          </section>
        </main>
      </div>
    );
  }
