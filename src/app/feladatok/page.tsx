"use client"

import InputBox from "@/components/boxes/input/InputBox";
import Header from "@/components/header/Header";
import QuestListComponent from "@/components/list/QuestList";
import styles from "./pages.module.css";
import { useEffect, useState } from "react";
import PaginationBox from "@/components/pagination/PaginationBox";
import axios from "axios";
import { useAuth } from "@/lib/authContext";

interface QuestType {
    id: number;
    title: string;
    taskDescription: string;
    difficulty: number;
    created: string;
    tags: TagType[];
}

interface TagType {
    id: number;
    name: string;
    description?: string;
}

const ListPage: React.FC = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(authUser);
    const [quests, setQuests] = useState<QuestType[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [status, setStatus] = useState<string>("all");
    const [difficulty, setDifficulty] = useState<string>("all");

    //OPTIMIZE: client-side caching and loading screen until fetch finishes
    const fetchQuests = async (page: number) => {
        if (!user) return;
        try {
            const response = await axios.get("http://localhost:8080/Quest/GetQuests", {
                params: {
                PageNumber: page,
                PageSize: 10,
                },
                headers: { Authorization: `Bearer ${await user.getIdToken()}` },
            });

            const quests = response.data.map((quest: QuestType) => ({
                id: quest.id,
                title: quest.title,
                taskDescription: quest.taskDescription,
                difficulty: quest.difficulty,
                created: quest.created,
                tags: quest.tags.map((tag: TagType) => ({
                id: tag.id,
                name: tag.name,
                description: tag.description,
                })),
            }));

            setQuests(quests);
        } catch (error) {
            console.error("Error fetching quests:", error);
        }
    };

    useEffect(() => {
        if (authUser) setUser(authUser);
    }, [authUser]);

    useEffect(() => {
        if (user) fetchQuests(1);
    }, [user]);

    const onPageChange = (page: number) => {
        fetchQuests(page);
    };

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
                <div className={styles.PaginationBox}>
                    <PaginationBox onChange={onPageChange} />
                </div>
            </div>
        </div>
    );
};

export default ListPage;
