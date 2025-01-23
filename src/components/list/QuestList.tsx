import React from "react";
import styles from "./QuestList.module.css";
import Link from "next/link";

interface ListComponentProps {
    quests: QuestType[];
    orderBy: "Title" | "Tags" | "Difficulty" | "CreationDate";
    setOrderBy: (key: "Title" | "Tags" | "Difficulty" | "CreationDate") => void;
    orderDirection: 'asc' | 'desc';
    setOrderDirection: (direction: 'asc' | 'desc') => void;
}

const difficultyLabels = ["", "Könnyű", "Közepes", "Nehéz"];
const difficultyColors = ["", "#0ccc26", "yellow", "#cc0c16"];

const QuestListComponent: React.FC<ListComponentProps> = ({ 
    quests, 
    orderBy, 
    setOrderBy,
    orderDirection,
    setOrderDirection
}) => {
    const handleHeaderClick = (key: "Title" | "Tags" | "Difficulty" | "CreationDate") => {
        if (orderBy === key) {
            setOrderDirection(orderDirection === 'desc' ? 'asc' : 'desc');
        } else {
            setOrderBy(key);
            setOrderDirection('desc');
        }
    };

    return (
        <div className={styles.container}>
            <div 
                className={`${styles.header} ${orderBy === "Title" ? styles.selectedHeader : ''}`}
                onClick={() => handleHeaderClick("Title")}
                style={{ cursor: 'pointer' }}
            >
                Cím {orderBy === "Title" && (orderDirection === 'desc' ? '▲' : '▼')}
            </div>
            <div 
                className={`${styles.header} ${orderBy === "Tags" ? styles.selectedHeader : ''}`}
                onClick={() => handleHeaderClick("Tags")}
                style={{ cursor: 'pointer' }}
            >
                Címkék {orderBy === "Tags" && (orderDirection === 'desc' ? '▲' : '▼')}
            </div>
            <div 
                className={`${styles.header} ${orderBy === "Difficulty" ? styles.selectedHeader : ''}`}
                onClick={() => handleHeaderClick("Difficulty")}
                style={{ cursor: 'pointer' }}
            >
                Nehézség {orderBy === "Difficulty" && (orderDirection === 'desc' ? '▲' : '▼')}
            </div>
            {quests.map((quest, index) => (
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
                        style={{ color: difficultyColors[quest.difficulty] || "white" }}
                    >
                        {difficultyLabels[quest.difficulty] || "???"}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default QuestListComponent;