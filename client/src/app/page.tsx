import ApiTester from "@/components/custom/apiTester";

export default function Home() {
  return (
    <div>
      <ApiTester getUrl="https://localhost:8080/Rat" postUrl="https://localhost:8080/Rat/PostRat" />
    </div>
  );
}
