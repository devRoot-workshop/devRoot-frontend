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
import TagContainer from "@/components/boxes/tag/TagContainer";
import TagComponent from "@/components/boxes/tag/TagComponent";
import AddTag from "@/components/boxes/tag/AddTag";

interface FetchParams {
    PageNumber: number;
    PageSize: number;
    SearchQuery: string;
    SortDifficulty?: string | number;
    SortTags?: number[];
}

const DEBOUNCE_DELAY = 500;

const ListPage: React.FC = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(authUser);
    const [quests, setQuests] = useState<QuestType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);
    const [tags, setTags] = useState<TagType[]>([]);

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
            const tagIds = tags.length > 0 ? tags.map((tag) => tag.id) : null;
    
            const params: FetchParams = {
                PageNumber: page,
                PageSize: 10,
                SearchQuery: debouncedSearchValue || '',
                SortDifficulty: difficulty || 0,
            };
    
            if (tagIds && tagIds.length > 0) {
                params.SortTags = tagIds;
            }
    
            try {
                const response = await axios.get("/api/quests/getQuests", {
                    params,
                    paramsSerializer: {
                        serialize: (params) => {
                            const queryString = new URLSearchParams();
                            for (const key in params) {
                                if (Array.isArray(params[key])) {
                                    queryString.append(key, params[key].join(','));
                                } else if (params[key] !== null && params[key] !== undefined) {
                                    queryString.append(key, params[key].toString());
                                }
                            }
                            return queryString.toString();
                        },
                    },
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
        [user, difficulty, debouncedSearchValue, tags]
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
                            { value: 0, display: "Minden nehézség" },
                            { value: 1, display: "Könnyű" },
                            { value: 2, display: "Közepes" },
                            { value: 3, display: "Nehéz" },
                        ]}
                    />

                    <TagContainer>
                        {tags.map((tag) => (
                            <TagComponent
                                key={tag.id}
                                id={tag.id}
                                text={tag.name}
                                setTags={setTags}
                            />
                        ))}
                        <AddTag setTags={setTags} tags={tags} />
                    </TagContainer>
                </div>
                <div className={styles.optionsContainer}>
                    <InputBox
                            value={searchValue}
                            placeholderText="Keresés..."
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