import Timer from "@/components/boxes/Timer/Timer";
import CodeBox from "@/components/boxes/Code/CodeBox";
import DifficultyBox from "@/components/boxes/difficultybox/DifficultyBox";
import styles from "./page.module.css";
import { mapLanguageToString } from "@/lib/global/functions/language";
import ConsoleDisplay from "@/components/boxes/console/Console";

interface QuestPageProps {
  quest: QuestType;
}

export default function QuestPage({ quest }: QuestPageProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Timer />

      <main className="flex flex-col md:flex-row gap-4">
        <section className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-bold">{quest.title}</h2>
            <br />
            <p className="text-gray-700">{quest.taskDescription}</p>
            <DifficultyBox difficulty={quest.difficulty} />
          </div>
          <ConsoleDisplay text={quest.console} />
        </section>

        <section className="flex-1 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold">
            Code Example {mapLanguageToString(quest.language)}
          </h2>
          <CodeBox code={quest.code} language={mapLanguageToString(quest.language)} />
        </section>
      </main>
    </div>
  );
}