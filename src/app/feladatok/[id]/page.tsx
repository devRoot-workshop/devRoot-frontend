"use client";

import Timer from "@/components/boxes/Timer/Timer";
import CodeHighlighter from "@/components/boxes/Code/CodeHighlighter";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/lib/authContext";

interface QuestType {
  id: number;
  title: string;
  taskDescription: string;
  created: Date;
  tags: [{
    id: string;
    name: string;
    description: string;
    }
  ];
}

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

  const { user } = useAuth();
  const [quest, setQuest] = useState<QuestType | undefined>();
  const params = useParams<{ id: string }>();

  const mapToQuestType = (data: any): QuestType => {
    return {
      id: data.id,
      title: data.title,
      taskDescription: data.taskDescription,
      created: new Date(data.created),
      tags: (data.tags ?? []).map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        description: tag.description,
      })),
    };
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (quest) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/${params.id}/GetQuest`,
          { headers: { Authorization: `Bearer ${user?.getIdToken()}` } }
        );
        console.log(response.data)
        const questData: QuestType = mapToQuestType(response.data);
        setQuest(questData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.exercisePage}>
      <Timer />

      <main>
        <section className={styles.leftPanel}>
          <div>
            <h2 className={styles.title}>{quest?.title}</h2>
            <br />
            <p className={styles.description}>
              {quest?.taskDescription}
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
