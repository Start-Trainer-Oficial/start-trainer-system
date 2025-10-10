import Carousel from "@/components/Carousel";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <Carousel />

      <div className="flex flex-col items-center justify-center mb-20">
        <h1 className="font-bold text-4xl uppercase mt-20">Agenda START</h1>
        <p className="mt-1">Confira nossas próximas programações!</p>
      </div>

    </div>
  );
}
