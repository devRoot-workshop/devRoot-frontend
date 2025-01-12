import Timer from "@/components/boxes/Timer/Timer";
import CodeBox from "@/components/boxes/Code/CodeBox";
import DifficultyBox from "@/components/boxes/difficultybox/DifficultyBox";
import styles from "./page.module.css";
import { mapLanguageToString } from "@/lib/global/functions/language";
import ConsoleDisplay from "@/components/boxes/console/Console";

interface QuestPageProps {
  quest: QuestType;
}

export default function QuestPage({ quest }: QuestPageProps) {
  return (
    <div className={styles.exercisePage}>
      <Timer />

      <main>
        <section className={styles.leftPanel}>
            <div>
                <h2 className={styles.title}>{quest.title}</h2>
                <br />
                <p className={styles.description}>
                    {quest.taskDescription}
                </p>
                <DifficultyBox difficulty={quest.difficulty} />
            </div>
          
            <ConsoleDisplay text={quest.console}/> 
          
        </section>

        <section className={styles.rightPanel}>
          <h2 className={`text-lg font-bold`}>Code Example {mapLanguageToString(quest.language)}</h2>
          <CodeBox code={quest.code} language={mapLanguageToString(quest.language)}/>
        </section>
      </main>
    </div>
  );
}

/*

          {quest.code ? (
            <>
              <CodeBox code={quest.code} language={mapLanguageToString(quest.language)}/>
            </>
          ) : (
            <div>
              <h3>Logical Exercise</h3>
              <form>
                <label htmlFor="answer">Write the correct answer:</label>
                <input 
                  type="text" 
                  id="answer" 
                  name="answer" 
                  className={styles.inputBox} 
                />
                <button 
                  type="submit" 
                  className={`${buttonStyles.button} ${buttonStyles.normal}`}
                >
                  Submit
                </button>
              </form>
            </div>
          )}

*/