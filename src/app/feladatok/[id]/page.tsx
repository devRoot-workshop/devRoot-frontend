"use client";

import Timer from "@/components/boxes/Timer/Timer";
import CodeHighlighter from "@/components/boxes/Code/CodeHighlighter";
import DifficultyBox from "@/components/boxes/difficultybox/DifficultyBox";
import styles from "./page.module.css";
import buttonStyles from "@/components/button/button.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/lib/authContext";
import { mapToQuestType } from "@/lib/global/functions/quest";

export default function QuestPage() {
  const { user } = useAuth();
  const [quest, setQuest] = useState<QuestType | undefined>();
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [consoleString, setConsoleString] = useState<string>('');
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (quest) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/Quest/${params.id}/GetQuest`,
          { headers: { Authorization: `Bearer ${await user?.getIdToken()}` } }
        );
        console.log(response.data);
        const questData: QuestType = mapToQuestType(response.data);
        setQuest(questData);
        setCodeSnippet(response.data.code);
        setConsoleString(response.data.console);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

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
            {quest && <DifficultyBox difficulty={quest.difficulty} />}
          </div>
          <div id="console-container">
            <h3 className="mt-4 font-semibold">Console</h3>
            <div>
              <pre className={`${styles.console} bg-gray-900 text-green-400 p-4 rounded-lg`}>
                {consoleString}
              </pre>
            </div>
          </div>
        </section>

        <section className={styles.rightPanel}>
          <h2 className={`text-lg font-bold`}>Code Example</h2>
          <button onClick={toggleCodeVisibility} className={`${buttonStyles.button} ${buttonStyles.normal}`}>
            {isCodeVisible ? 'Hide Code' : 'Show Code'}
          </button>
          <div id="solution" className={isCodeVisible ? '' : styles.blurred}>
            <CodeHighlighter code={codeSnippet} language="csharp" />
          </div>
        </section>
      </main>
    </div>
  );
}
