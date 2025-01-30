import React from "react";
import styles from "./QuestList.module.css";
import Link from "next/link";

interface ListComponentProps {
    quests: QuestType[];
    orderBy: "Title" | "Tags" | "Difficulty" | "CreationDate";
    setOrderBy: (key: "Title" | "Tags" | "Difficulty" | "CreationDate") => void;
    orderDirection: 'Ascending' | 'Descending';
    setOrderDirection: (direction: 'Ascending' | 'Descending') => void;
}

const difficultyLabels = ["", "Könnyű", "Közepes", "Nehéz"];
const difficultyColors = ["", "#0ccc26", "yellow", "#cc0c16"];

const difficultyMapping: { [key: string]: number } = {
    "Easy": 1,
    "Normal": 2,
    "Hard": 3,
};

const QuestListComponent: React.FC<ListComponentProps> = ({ 
    quests, 
    orderBy, 
    setOrderBy,
    orderDirection,
    setOrderDirection
}) => {
    const handleHeaderClick = (key: "Title" | "Tags" | "Difficulty" | "CreationDate") => {
        if (orderBy === key) {
            setOrderDirection(orderDirection === 'Descending' ? 'Ascending' : 'Descending');
        } else {
            setOrderBy(key);
            setOrderDirection('Ascending');
        }
    };

    return (
        <div className={styles.container}>
            <div 
                className={styles.header} 
                onClick={() => handleHeaderClick("Title")}
                style={{ cursor: 'pointer' }}
            >
                Cím {orderBy === "Title" && (orderDirection === 'Ascending' ? '▼' : '▲')}
            </div>
            <div 
                className={styles.header}
                onClick={() => handleHeaderClick("Tags")}
                style={{ cursor: 'pointer' }}
            >
                Címkék {orderBy === "Tags" && (orderDirection === 'Ascending' ? '▼' : '▲')}
            </div>
            <div 
                className={styles.header}
                onClick={() => handleHeaderClick("Difficulty")}
                style={{ cursor: 'pointer' }}
            >
                Nehézség {orderBy === "Difficulty" && (orderDirection === 'Ascending' ? '▼' : '▲')}
            </div>
            {quests.map((quest, index) => {
                const difficultyNumber = difficultyMapping[quest.difficulty] || 0;

                return (
                    <React.Fragment key={index}>
                        <div className={styles.cell}>
                            <Link href={`/feladatok/${quest.id}`}>{quest.title}</Link>
                        </div>
                        <div className={styles.cell}>
                            {quest.tags.length > 0 ? (
                                quest.tags.map((tag) => (
                                    <span key={tag.id} className={styles.tag}>
                                        {tag.name}
                                    </span>
                                ))
                            ) : (
                                <span className={styles.tag}>Nincs címke</span>
                            )}
                        </div>
                        <div
                            className={styles.cell}
                            style={{ color: difficultyColors[difficultyNumber] || "white" }}
                        >
                            {difficultyLabels[difficultyNumber] || "???"}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default QuestListComponent;