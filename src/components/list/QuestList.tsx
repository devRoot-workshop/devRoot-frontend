import React from "react";
import styles from "./QuestList.module.css";

interface ListComponentProps {
    quests: QuestType[];
}

const QuestListComponent: React.FC<ListComponentProps> = ({ quests }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Státusz</div>
            <div className={styles.header}>Cím</div>
            <div className={styles.header}>Nehézség</div>
            {quests.map((quest, index) => (
                <React.Fragment key={index}>
                    <div className={`${styles.cell} ${styles.status}`}>✅</div>
                    <div className={styles.cell}><a href={"/feladatok/"+quest.id}>{quest.title}</a></div>
                    <div className={styles.cell}>Nehéz</div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default QuestListComponent;
