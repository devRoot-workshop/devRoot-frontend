interface QuestType {
    id?: number;
    title: string;
    taskDescription: string;
    created: string;
    tags: {
            id: number;
            name: string;
            description?: string;
        }[];
}