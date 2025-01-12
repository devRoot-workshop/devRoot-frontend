import QuestPage from "./QuestPage";

async function fetchQuests(): Promise<QuestType[]> {
    const response = await fetch("http://localhost:8080/Quest/GetQuests");
    if (!response.ok) {
        throw new Error(`Failed to fetch quests: ${response.statusText}`);
    }
    return response.json();
}

async function fetchQuest(id: string): Promise<QuestType> {
    const response = await fetch(`http://localhost:8080/Quest/${id}/GetQuest`);
    if (!response.ok) {
        throw new Error(`Failed to fetch quest: ${response.statusText}`);
    }
    return response.json();
}

export async function generateStaticParams() {
    try {
        const quests = await fetchQuests();
        return quests.map((quest) => ({
            id: quest.id.toString()
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

interface Props {
    params: {
        id: string; 
    };
}

export default async function QuestParent({ params }: Props) {
    const quest = await fetchQuest(params.id);
    return <QuestPage quest={quest} />;
}