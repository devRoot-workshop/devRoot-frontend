export const mapToQuestType = (data: QuestType): QuestType => {
  return {
      id: data.id,
      title: data.title,
      taskDescription: data.taskDescription,
      created: data.created,
      difficulty: data.difficulty,
      code: data.code,
      console: data.console,
      language: data.language,
      tags: (data.tags ?? []).map((tag) => ({
          id: tag.id,
          name: tag.name,
          description: tag.description,
      })),
  };
};
