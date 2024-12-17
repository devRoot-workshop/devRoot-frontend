interface QuestType {
    id: number;
    title: string;
    taskDescription: string;
    created: Date;
    tags: [{
        id: string;
        name: string;
        description: string;
        }
    ];
}