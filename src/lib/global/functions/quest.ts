export const mapToQuestType = (data: any): QuestType => {
    return {
      id: data.id,
      title: data.title,
      taskDescription: data.taskDescription,
      created: new Date(data.created),
      tags: (data.tags ?? []).map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        description: tag.description,
      })),
    };
  };