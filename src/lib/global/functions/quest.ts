export const mapToQuestType = (data: QuestType): QuestType => {
  return {
    id: data.id ?? 0,
    title: data.title ?? "",
    taskDescription: data.taskDescription ?? "",
    difficulty: data.difficulty ?? 0,
    created: data.created ?? "",
    tags: (data.tags ?? []).map((tag): TagType => ({
      id: tag.id,
      name: tag.name,
      description: tag.description,
    })),
  };
};
