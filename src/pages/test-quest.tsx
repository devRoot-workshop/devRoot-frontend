import { mockQuest } from "@/app/feladatok/[id]/page";
import QuestPage from "@/app/feladatok/[id]/QuestPage";

export default function TestQuestPage() {
  return <QuestPage quest={mockQuest} />;
}