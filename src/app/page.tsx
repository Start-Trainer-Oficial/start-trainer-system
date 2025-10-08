import Carousel from "@/components/Carousel";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <Carousel />
    </div>
  );
}
