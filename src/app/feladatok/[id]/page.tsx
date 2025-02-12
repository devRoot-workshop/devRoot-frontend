import { domain, port, secure } from "@/lib/global/global";
import QuestPage from "./QuestPage";

async function fetchQuests(): Promise<QuestType[]> {
  const response = await fetch(`http${secure ? 's' : ''}://${domain}:${port}/Quest/GetQuests`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch quests: ${response.statusText}`);
  }
  
  const data = (await response.json()).items;
  console.log("Fetched quests data:", data);

  if (!Array.isArray(data)) {
    throw new Error("API did not return an array");
  }

  return data;
}

async function fetchQuest(id: string): Promise<QuestType> {
  const response = await fetch(
    `http${secure ? "s" : ""}://${domain}:${port}/Quest/${id}/GetQuest`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch quest: ${response.statusText}`);
  }
  return response.json();
}

export async function generateStaticParams() {
  try {
    const quests = await fetchQuests();
    return quests.map((quest) => ({
      id: quest.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

type Params = Promise<{ id: string }>;

export default async function QuestParent(props: { params: Params }) {
  const params = await props.params;
  const quest = await fetchQuest(params.id);
  return <QuestPage quest={quest} />;
}

// Define and export the mockQuest object
export const mockQuest: QuestType = {
  id: "",
  title: "Sample Quest",
  taskDescription: "This is a sample task description for testing purposes.",
  difficulty: 2,
  console: "Sample console output",
  code: "console.log('Hello, world!');",
  language: 4,
  created: new Date().toISOString(),
  tags: [ , ],
};