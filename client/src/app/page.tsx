import ApiTester from "@/components/custom/apiTester";

export default function Home() {
  return (
    <div>
      <ApiTester getUrl="http://localhost:8080/Rat" postUrl="http://localhost:8080/Rat/PostRat" />
    </div>
  );
}
