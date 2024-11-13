import ApiTester from "@/components/custom/apiTester";

export default function Home() {
  return (
    <div>
      <ApiTester getUrl="https://localhost:32771/Rat" postUrl="https://localhost:32771/Rat/PostRat" />
    </div>
  );
}
