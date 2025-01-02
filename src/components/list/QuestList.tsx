import React from "react";
import styles from "./QuestList.module.css";

interface ListComponentProps {
    quests: QuestType[];
}

const difficultyLabels = ["Könnyű", "Közepes", "Nehéz"];
const difficultyColors = ["#0ccc26", "yellow", "#cc0c16"];

const QuestListComponent: React.FC<ListComponentProps> = ({ quests }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Státusz</div>
            <div className={styles.header}>Cím</div>
            <div className={styles.header}>Nehézség</div>
            {quests.map((quest, index) => (
                <React.Fragment key={index}>
                    <div className={`${styles.cell} ${styles.status}`}>✅</div>
                    <div className={styles.cell}>
                        <a href={`/feladatok/${quest.id}`}>{quest.title}</a>
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
