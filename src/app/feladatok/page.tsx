"use client"

import InputBox from "@/components/boxes/input/InputBox";
import Header from "@/components/header/Header"
import QuestListComponent from "@/components/list/QuestList"
import styles from "./pages.module.css"
import { useState } from "react";

// mock data -----------------------------
const quests: QuestType[] = [
    {
        id: 1,
        difficulty: 1,
        title: "Defeat the Dragon",
        taskDescription: "Venture to the mountain and slay the dragon terrorizing the village.",
        created: "2024-12-26",
        tags: [
            { id: 1, name: "Adventure", description: "Exciting and risky challenges." },
            { id: 2, name: "Combat" },
        ],
    },
    {
        id: 2,
        difficulty: 0,
        title: "Gather Herbs",
        taskDescription: "Collect 10 healing herbs from the forest for the village healer.",
        created: "2024-12-25",
        tags: [
            { id: 3, name: "Collection", description: "Tasks involving gathering items." },
            { id: 4, name: "Nature" },
        ],
    },
    {
        id: 3,
        difficulty: 2,
        title: "Repair the Bridge",
        taskDescription: "Fix the broken bridge to reopen the trade route to the neighboring town.",
        created: "2024-12-24",
        tags: [
            { id: 5, name: "Construction", description: "Tasks related to building or repairing." },
        ],
    },
];
// mock data -----------------------------

const ListPage: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [status, setStatus] = useState<string>("all");
    const [difficulty, setDifficulty] = useState<string>("all");

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.optionsContainer}>
                    <select
                        name="status"
                        className={styles.customSelect}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="all">Minden státusz</option>
                        <option value="finished">Kész ✅</option>
                        <option value="unfinished">Megoldatlan ❌</option>
                    </select>
                    <select
                        name="difficulty"
                        className={styles.customSelect}
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="all">Minden nehézség</option>
                        <option value="easy">Könnyű</option>
                        <option value="medium">Közepes</option>
                        <option value="hard">Nehéz</option>
                    </select>
                    <InputBox
                        value={searchValue}
                        placeholderText="Keresés..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        icon={"🔍"}
                    />
                </div>
                <br />
                <QuestListComponent quests={quests} />
            </div>
        </div>
    );
};

export default ListPage