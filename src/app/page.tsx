import Carousel from "@/components/Carousel";
import DiaryComponent from "@/components/diary/diaryComponent";

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      <Carousel />

      <div className="flex flex-col items-center justify-center mb-20">
        <h1 className="font-bold text-4xl uppercase mt-20 text-[#733df2]">Agenda START</h1>
        <p className="mt-1 font-bold opacity-70">Confira nossas próximas programações!</p>
        <DiaryComponent />
      </div>

    </div>
  );
}
