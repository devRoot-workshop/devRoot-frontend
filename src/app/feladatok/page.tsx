"use client";

import { useCallback, useEffect, useState } from "react";
import QuestListComponent from "@/components/list/QuestList";
import PaginationBox from "@/components/pagination/PaginationBox";
import axios from "axios";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import styles from "./pages.module.css";
import InputBox from "@/components/boxes/input/InputBox";
import DropDown from "@/components/dropdown/DropDown";
import TagComponent from "@/components/boxes/tag/TagComponent";
import AddTag from "@/components/boxes/tag/AddTag";
import { domain, port, secure } from "@/lib/global/global";
import Container from "@/components/boxes/container/Container";

interface FetchParams {
    pageNumber: number;
    pageSize: number;
    searchQuery: string;
    sortDifficulty?: string | number;
    sortTags?: number[];
    orderBy?: string;
    orderDirection?: string;
}

const DEBOUNCE_DELAY = 450;

const ListPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [quests, setQuests] = useState<QuestType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);
    const [tags, setTags] = useState<TagType[]>([]);

    const [orderBy, setOrderBy] = useState<"Title" | "Tags" | "Difficulty" | "CreationDate">("Title");
    const [orderDirection, setOrderDirection] = useState<"Ascending" | "Descending">("Ascending");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const fetchQuests = useCallback(
        async (page: number) => {
            setQuests([])
            setIsLoading(true);
            const tagIds = tags.length > 0 ? tags.map((tag) => tag.id) : null;

            const params: FetchParams = {
                pageNumber: page,
                pageSize: 10,
                searchQuery: debouncedSearchValue,
                sortDifficulty: difficulty,
                orderBy: orderBy,
                orderDirection: orderDirection
            };

            if (tagIds !== null) {
                params.sortTags = tagIds;
            }

            try {
                const response = await axios.get(`http${secure ? 's' : ''}://${domain}:${port}/Quest/GetQuests`, {
                    params,
                    paramsSerializer: {
                        serialize: (params) => {
                            const queryString = new URLSearchParams();
                            for (const key in params) {
                                if (Array.isArray(params[key])) {
                                    queryString.append(key, params[key].join(','));
                                } else {
                                    queryString.append(key, params[key]);
                                }
                            }
                            return queryString.toString();
                        },
                    },
                });

                const quests = response.data.items.map((quest: QuestType) => ({
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
                
                setTotalPages(response.data.totalPages);
                setQuests(quests);
            } catch (error) {
                console.error("Error fetching quests:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [difficulty, debouncedSearchValue, tags, orderBy, orderDirection]
    );

    useEffect(() => {
        fetchQuests(1);
    }, [fetchQuests]);

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

                    <Container padding={"10px 12px"}>
                        {tags.map((tag) => (
                            <TagComponent
                                key={tag.id}
                                id={tag.id}
                                text={tag.name}
                                setTags={setTags}
                            />
                        ))}
                        <AddTag setTags={setTags} tags={tags} />
                    </Container>
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
                    <QuestListComponent quests={quests} orderBy={orderBy} setOrderBy={setOrderBy} orderDirection={orderDirection} setOrderDirection={setOrderDirection}/>
                    {isLoading && <LoadingOverlay />}
                </div>
                <div className={styles.PaginationBox}>
                    <PaginationBox totalPages={totalPages} onChange={onPageChange} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
};

export default ListPage;

const LoadingOverlay = () => {
    return (
        <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center rounded-lg">
            <LoadingSpinner />
        </div>
    );
};
