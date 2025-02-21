'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './QuestPage.module.css';
import ConsoleDisplay from '@/components/boxes/console/Console';
import TagComponent from '@/components/boxes/tag/TagComponent';
import CodeBox from '@/components/boxes/Code/CodeBox';
import VoteButton from '@/components/vote/Vote';
import { domain, port, secure } from '@/lib/global/global';
import { useAuth } from '@/lib/authContext';
import LoadingSpinner from '@/components/spinner/LoadingSpinner';

interface QuestPageProps {
  quest: QuestType;
}

export default function QuestPage({ quest }: QuestPageProps) {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('Feladat');
  const [activeCodeTab, setActiveCodeTab] = useState(() =>
    quest && quest.exampleCodes && quest.exampleCodes.length > 0
      ? quest.exampleCodes[0].language
      : ''
  );
  const [userVote, setUserVote] = useState<'UpVote' | 'DownVote' | 'none'>('none');
  const [isVoteLoaded, setIsVoteLoaded] = useState(false);

  useEffect(() => {
    if (!loading && quest) {
      const fetchUserVote = async () => {
        try {
          const response = await axios.get(
            `http${secure ? 's' : ''}://${domain}:${port}/Vote/GetUserVotes`,
            {
              params: { For: 'Quest', VoteId: quest.id },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await user?.getIdToken()}`
              },
            }
          );
          if (response.data.length > 0) {
            setUserVote(response.data[0].type);
          }
          setIsVoteLoaded(true);
        } catch (error) {
          console.error('Error fetching user vote:', error);
          setIsVoteLoaded(true);
        }
      };
      fetchUserVote();
    }
  }, [quest, loading, user]);
  
  if (quest.title === null) return <h1 className="title-description">Feladat nem található.</h1>;

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
            <p className={styles.questInformation}>
              {quest.difficulty} | {quest.created} |{' '}
              {quest.availableLanguages?.join(', ') || 'Bármilyen nyelvre'}
            </p>
            <div className={styles.tagContainer}>
              {quest.tags.map((tag) => (
                <div key={tag.name}>
                  <TagComponent id={tag.id} text={tag.name} />
                </div>
              ))}
            </div>
          </div>
          <p className={styles.questTextData}>{quest.taskDescription}</p>
          <ConsoleDisplay text={quest.console} />
          {isVoteLoaded ? (
            <VoteButton votes={quest.votes} questId={quest.id} userVoted={userVote} />
          ) : (
            <LoadingSpinner />
          )}
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
                    className={
                      activeCodeTab === example.language ? styles.activeCodeTab : styles.codeTab
                    }
                    onClick={() => setActiveCodeTab(example.language)}
                  >
                    {example.language}
                  </button>
                ))}
              </div>
              {quest.exampleCodes.map(
                (example) =>
                  activeCodeTab === example.language && (
                    <div key={example.id}>
                      <CodeBox code={example.code} language={example.language} />
                    </div>
                  )
              )}
            </>
          ) : (
            <div>Nincsenek megtekinthető megoldások.</div>
          )}
        </div>
      )}
    </div>
  );
}
