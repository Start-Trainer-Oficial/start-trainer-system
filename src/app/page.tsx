import Carousel from "@/components/carousels/MainCarousel";
import EventComponent from "@/components/tickets/EventsComponent";
import ComingSoon from "@/components/carousels/ComingSoonCarousel";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex flex-col w-full">

      <div className="relative w-full">
        <Image
          src="https://res.cloudinary.com/dytw21kw2/image/upload/v1765761625/baseBackground_t4yfyc.jpg"
          alt="Start Trainer"
          width={1920}
          height={1080}
          quality={100}
          priority
          className="w-full h-auto lg:h-[850px] object-cover"
        />
      </div>

      <div id="agenda" className="flex flex-col items-center justify-center">
        <h1 className="font-extrabold text-4xl uppercase mt-20 text-[#381877]">
          Agenda START
        </h1>
        <p className="mt-1 font-bold opacity-70">
          Confira nossas próximas programações!
        </p>
        <EventComponent />
      </div>

      <div className="flex flex-col items-start justify-center lg:px-[20%] mt-10 py-10"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dytw21kw2/image/upload/v1765647023/main_lr3jsg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* <h1 className="font-bold text-3xl uppercase ml-6 mt-10 text-white">
          EM BREVE 🔥
        </h1>
        <p className="mt-1 ml-6 text-white font-bold">
          Pra você ficar de olho!
        </p> */}
        <ComingSoon />
      </div>

    </div>
  );
}
