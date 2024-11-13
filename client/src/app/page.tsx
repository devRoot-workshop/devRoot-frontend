import ApiTester from "@/components/custom/apiTester";

export default function Home() {
  return (
    <div>
      <ApiTester getUrl="http://localhost:5000/api/" postUrl="http://localhost:5000/api/" />
    </div>
  );
}
