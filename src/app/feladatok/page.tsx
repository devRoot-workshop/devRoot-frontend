"use client";

import QuestListComponent from "@/components/list/QuestList";
import styles from "./pages.module.css";
import { useEffect, useState } from "react";
import PaginationBox from "@/components/pagination/PaginationBox";
import axios from "axios";
import { useAuth } from "@/lib/authContext";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";

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
    const [quests, setQuests] = useState<QuestType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchQuests = async (page: number) => {
        if (!authUser) return;
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/Quest/GetQuests", {
                params: {
                    PageNumber: page,
                    PageSize: 10,
                },
                headers: { Authorization: `Bearer ${await authUser.getIdToken()}` },
            });

            const formattedQuests: QuestType[] = response.data.map((quest: QuestType) => ({
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

            setQuests(formattedQuests);
        } catch (error) {
            console.error("Error fetching quests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (authUser) fetchQuests(1);
    }, [authUser]);

    return (
        <div className={styles.container}>
            <br />
            <div className="relative min-h-[200px]">
                <QuestListComponent quests={quests} />
                {isLoading && <LoadingOverlay />}
            </div>
            <div className={styles.PaginationBox}>
                <PaginationBox onChange={fetchQuests} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default ListPage;

const LoadingOverlay: React.FC = () => (
    <div className="absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center rounded-lg">
        <LoadingSpinner />
    </div>
);

/*
- SEARCH PARAMETER SETTINGS

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
 */