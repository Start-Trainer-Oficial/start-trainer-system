import Carousel from "@/components/carousels/MainCarousel";
import EventComponent from "@/components/tickets/EventComponent";
import ComingSoon from "@/components/carousels/ComingSoonCarousel";

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      <Carousel />

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl uppercase mt-20 text-[#733df2]">Agenda START</h1>
        <p className="mt-1 font-bold opacity-70">Confira nossas próximas programações!</p>
        <EventComponent />
      </div>

      <div className="flex flex-col items-start justify-center lg:px-[20%] mb-20">
        <h1 className="font-bold text-3xl uppercase ml-6 mt-20 text-[#733df2]">EM BREVE 🔥</h1>
        <p className="mt-1 ml-6 font-bold opacity-70">Pra você ficar de olho!</p>
        <ComingSoon />
      </div>

    </div>
  );
}
