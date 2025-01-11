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
import { mapLanguageToString } from "@/lib/global/functions/language";

export default function QuestPage() {
  const { user } = useAuth();
  const [quest, setQuest] = useState<QuestType | undefined>();
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [consoleString, setConsoleString] = useState<string>('');
  const [language, setLanguage] = useState<string>('unknown');
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setCodeSnippet(response.data.code || '');
        setConsoleString(response.data.console || '');
        setLanguage(mapLanguageToString(response.data.language));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, quest, user]);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          {consoleString && (
            <div id="console-container">
              <h3 className="mt-4 font-semibold">Console</h3>
              <div>
                <pre className={`${styles.console} bg-gray-900 text-green-400 p-4 rounded-lg`}>
                  {consoleString}
                </pre>
              </div>
            </div>
          )}
        </section>

        <section className={styles.rightPanel}>
          <h2 className={`text-lg font-bold`}>Code Example ({language})</h2>
          {codeSnippet ? (
            <>
              <button onClick={toggleCodeVisibility} className={`${buttonStyles.button} ${buttonStyles.normal}`}>
                {isCodeVisible ? 'Hide Code' : 'Show Code'}
              </button>
              <div id="solution" className={isCodeVisible ? '' : styles.blurred}>
                <CodeHighlighter code={codeSnippet} language={language} />
              </div>
            </>
          ) : (
            <div>
              <h3>Logical Exercise</h3>
              <form>
                <label htmlFor="answer">Write the correct answer:</label>
                <input type="text" id="answer" name="answer" className={styles.inputBox} />
                <button type="submit" className={`${buttonStyles.button} ${buttonStyles.normal}`}>Submit</button>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
