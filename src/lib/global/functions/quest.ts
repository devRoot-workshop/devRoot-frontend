export const mapToQuestType = (data: QuestType): QuestType => {
  return {
    id: data.id,
    title: data.title,
    taskDescription: data.taskDescription,
    exampleCodes: data.exampleCodes ?? [],
    console: data.console,
    difficulty: data.difficulty,
    availableLanguages: data.availableLanguages,
    created: data.created,
    votes: data.votes,
    tags: (data.tags ?? []).map((tag) => ({
      id: tag.id,
      name: tag.name,
      description: tag.description,
    })),
  };
};
