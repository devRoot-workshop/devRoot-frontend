'use client';

import { useState } from 'react';
import styles from './QuestPage.module.css';
import ConsoleDisplay from '@/components/boxes/console/Console';
import TagComponent from '@/components/boxes/tag/TagComponent';
import CodeBox from '@/components/boxes/Code/CodeBox';
import VoteButton from '@/components/vote/Vote';

interface QuestPageProps {
  quest: QuestType;
}

export default function QuestPage({ quest }: QuestPageProps) {
  if (!quest) {
    return <div>No quest data available</div>;
  }

  const [activeTab, setActiveTab] = useState('Feladat');
  const [activeCodeTab, setActiveCodeTab] = useState(() => 
    quest.exampleCodes && quest.exampleCodes.length > 0 
      ? quest.exampleCodes[0].language 
      : ''
  );
  
  return (
    <div className={styles.questContainer}>
      <div className={styles.tabHeader}>
        <button 
          className={activeTab === 'Feladat' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Feladat')}
        >
          Feladat
        </button>
        <button 
          className={activeTab === 'Megoldások' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Megoldások')}
        >
          Megoldások
        </button>
      </div>

      {activeTab === 'Feladat' && (
        <div className={styles.questContent}>
          <div className={styles.questData}>
            <h1 className={styles.title}>{quest.title}</h1>
            <p className={styles.questInformation}>{quest.difficulty} | {quest.created} | {quest.availableLanguages?.join(', ') || "Bármilyen nyelvre"}</p>
            
            <div className={styles.tagContainer}>
              {quest.tags.map((tag) => (
                <div key={tag.name}>
                  <TagComponent id={tag.id} text={tag.name}></TagComponent>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.questTextData}>{quest.taskDescription}</p>
          <ConsoleDisplay text={quest.console}></ConsoleDisplay>
          <VoteButton votes={quest.votes} questId={quest.id} userVoted={false}/>
        </div>
      )}

      {activeTab === 'Megoldások' && (
        <div className={styles.solutionsContent}>
          {quest.exampleCodes && quest.exampleCodes.length > 0 ? (
            <>
              <div className={styles.codeTabHeader}>
                {quest.exampleCodes.map((example) => (
                  <button 
                    key={example.id}
                    className={activeCodeTab === example.language ? styles.activeCodeTab : styles.codeTab}
                    onClick={() => setActiveCodeTab(example.language)}
                  >
                    {example.language}
                  </button>
                ))}
              </div>
              {quest.exampleCodes.map((example) => (
                activeCodeTab === example.language && (
                  <div key={example.id}>
                    <CodeBox code={example.code} language={example.language}/>
                  </div>
                )
              ))}
            </>
          ) : (
            <div>Nincsenek megtekinthető megoldások.</div>
          )}
        </div>
      )}
    </div>
  );
}

/*
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
      </main>
*/

/*
<section className={styles.rightPanel}>
          <h2 className={`text-lg font-bold`}>Code Example {mapLanguageToString(quest.language)}</h2>
          <CodeBox code={quest.code} language={mapLanguageToString(quest.language)}/>
</section>
*/

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