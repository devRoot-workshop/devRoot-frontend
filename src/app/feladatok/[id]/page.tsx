import { domain, port, secure } from "@/lib/global/global";
import QuestPage from "./QuestPage";

export async function generateStaticParams() {
  try {
    const quests = await fetchQuests();
    return quests.map((quest) => ({
      id: quest.id.toString(),
      title: quest.title,
      taskDescription: quest.taskDescription,
      exampleCodes: JSON.stringify(quest.exampleCodes),
      console: quest.console,
      difficulty: quest.difficulty.toString(),
      availableLanguages: quest.availableLanguages,
      created: quest.created,
      tags: JSON.stringify(quest.tags)
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

function questParamsToQuestType(params: {
  id: string;
  title: string;
  taskDescription: string;
  exampleCodes: string;
  console: string;
  difficulty: string;
  availableLanguages: string[];
  created: string;
  tags: string;
}): QuestType {
  return {
    id: parseInt(params.id),
    title: params.title,
    taskDescription: params.taskDescription,
    exampleCodes: JSON.parse(params.exampleCodes),
    console: params.console,
    difficulty: parseInt(params.difficulty),
    availableLanguages: params.availableLanguages,
    created: params.created,
    tags: JSON.parse(params.tags)
  };
}

async function fetchQuests(): Promise<QuestType[]> {
  const response = await fetch(`http${secure ? 's' : ''}://${domain}:${port}/Quest/GetQuests`, {
    next: { 
      revalidate: false 
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch quests: ${response.statusText}`);
  }
  const data = (await response.json()).items;
  if (!Array.isArray(data)) {
    throw new Error("API did not return an array");
  }
  return data;
}

async function fetchQuest(id: string): Promise<QuestType> {
  const response = await fetch(`http${secure ? 's' : ''}://${domain}:${port}/Quest/${id}/GetQuest`, {
    next: { 
      revalidate: false 
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch quest: ${response.statusText}`);
  }
  return response.json();
}

export default async function QuestParent({ params: rawParams }: { 
  params: { 
    id: string;
    title?: string;
    taskDescription?: string;
    exampleCodes?: string;
    console?: string;
    difficulty?: string;
    availableLanguages?: string[];
    created?: string;
    tags?: string;
  } | Promise<{
    id: string;
    title?: string;
    taskDescription?: string;
    exampleCodes?: string;
    console?: string;
    difficulty?: string;
    availableLanguages?: string[];
    created?: string;
    tags?: string;
  }>
}) {
  const params = await rawParams;
  const quest = params.title
    ? questParamsToQuestType(params as any)
    : await fetchQuest(params.id);
  return <QuestPage quest={quest} />;
}

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = false;
