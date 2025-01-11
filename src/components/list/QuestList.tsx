import React from "react";
import styles from "./QuestList.module.css";
import Link from "next/link";

interface ListComponentProps {
    quests: QuestType[];
}

const difficultyLabels = ["Könnyű", "Közepes", "Nehéz"];
const difficultyColors = ["#0ccc26", "yellow", "#cc0c16"];

const QuestListComponent: React.FC<ListComponentProps> = ({ quests }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Cím</div>
            <div className={styles.header}>Címkék</div>
            <div className={styles.header}>Nehézség</div>
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
