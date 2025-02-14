interface QuestType {
    id: number,
    title: string,
    taskDescription: string,
    exampleCodes: ExampleCodeType[],
    console: string,
    difficulty: number,
    availableLanguages: string[],
    created: string,
    tags: TagType[],
    
    votes: number
}
