"use client";

import { useCallback, useEffect, useState } from "react";
import QuestListComponent from "@/components/list/QuestList";
import PaginationBox from "@/components/pagination/PaginationBox";
import axios from "axios";
import { useAuth } from "@/lib/authContext";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import styles from "./pages.module.css";
import InputBox from "@/components/boxes/input/InputBox";
import DropDown from "@/components/dropdown/DropDown";

const DEBOUNCE_DELAY = 500;

const ListPage: React.FC = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(authUser);
    const [quests, setQuests] = useState<QuestType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);
    const [language, setLanguage] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const fetchQuests = useCallback(
        async (page: number) => {
            if (!user) return;
            setIsLoading(true);
            console.log({
                PageNumber: page,
                PageSize: 10,
                SearchQuery: debouncedSearchValue,
                SortDifficulty: difficulty,
                Language: language,
            });
            try {
                const response = await axios.get("http://localhost:8080/Quest/GetQuests", {
                    params: {
                        PageNumber: page,
                        PageSize: 10,
                        SearchQuery: debouncedSearchValue,
                        SortDifficulty: difficulty,
                        SortLanguage: language,
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
            } finally {
                setIsLoading(false);
            }
        },
        [user, difficulty, debouncedSearchValue, language]
    );

    useEffect(() => {
        if (authUser) setUser(authUser);
    }, [authUser]);

    useEffect(() => {
        if (user) fetchQuests(1);
    }, [user, fetchQuests]);

    const onPageChange = (page: number) => {
        fetchQuests(page);
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.optionsContainer}>
                    <DropDown
                        name="difficulty"
                        value={difficulty.toString()}
                        onChange={(e) => setDifficulty(Number(e.target.value))}
                        options={[
                            { value: 0, display: "All Difficulties" },
                            { value: 1, display: "Easy" },
                            { value: 2, display: "Medium" },
                            { value: 3, display: "Hard" },
                        ]}
                    />
                    <DropDown
                        name="language"
                        value={language.toString()}
                        onChange={(e) => setLanguage(Number(e.target.value))}
                        options={[
                            { value: 0, display: "All Languages" },
                            { value: 1, display: "Python" },
                            { value: 2, display: "C#" },
                            { value: 3, display: "Next.js" },
                            { value: 4, display: "Java" },
                            { value: 5, display: "C++" },
                            { value: 6, display: "C" },
                        ]}
                    />
                    <InputBox
                        value={searchValue}
                        placeholderText="Search..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        icon={"🔍"}
                    />
                </div>
                <br />
                <div className="relative min-h-[200px]">
                    <QuestListComponent quests={quests} />
                    {isLoading && <LoadingOverlay />}
                </div>
                <div className={styles.PaginationBox}>
                    <PaginationBox onChange={onPageChange} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
};

export default ListPage;

const LoadingOverlay = () => {
    return (
        <div className="absolute inset-0 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <LoadingSpinner />
        </div>
    );
};
