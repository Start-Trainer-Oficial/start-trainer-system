import Carousel from "@/components/Carousel";
import DiaryComponent from "@/components/diary/diaryComponent";
import ComingSoon from "@/components/ComingSoon";

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      <Carousel />

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl uppercase mt-20 text-[#733df2]">Agenda START</h1>
        <p className="mt-1 font-bold opacity-70">Confira nossas próximas programações!</p>
        <DiaryComponent />
      </div>

      <div className="flex flex-col items-start justify-center px-[20%] mb-20">
        <h1 className="font-bold text-3xl uppercase mt-20 text-[#733df2]">EM BREVE 🔥</h1>
        <p className="mt-1 font-bold opacity-70">Pra você ficar de olho!</p>
        <ComingSoon />
      </div>

    </div>
  );
}
