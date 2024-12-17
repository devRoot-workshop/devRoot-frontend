interface QuestType {
    id?: number;
    title: string;
    taskDescription: string;
    created: string;
    tags: [{
            id: string;
            name?: string;
            description?: string;
        }
    ];
}