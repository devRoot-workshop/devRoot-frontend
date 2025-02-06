import QuestPage from "./QuestPage";
import { domain, port, secure } from "@/lib/global/global";

async function fetchQuest(id: string): Promise<QuestType> {
  const response = await fetch(
    `http${secure ? "s" : ""}://${domain}:${port}/Quest/${id}/GetQuest`,
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch quest: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  const validateTag = (tag: any): TagType => ({
    id: typeof tag.id === "number" ? tag.id : parseInt(tag.id),
    name: tag.name,
    description: tag.description,
  });
  
  const tags = Array.isArray(data.tags)
    ? data.tags.map(validateTag)
    : typeof data.tags === "string"
    ? JSON.parse(data.tags).map(validateTag)
    : [];
    
  return {
    id: data.id,
    title: data.title,
    taskDescription: data.taskDescription,
    exampleCodes: data.exampleCodes || [],
    console: data.console,
    difficulty: data.difficulty,
    availableLanguages: data.availableLanguages || [],
    created: data.created || new Date().toISOString().split("T")[0],
    tags,
  };
}

export default async function QuestParent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; 
    const quest = await fetchQuest(id); 
    return <QuestPage quest={quest} />; 
}