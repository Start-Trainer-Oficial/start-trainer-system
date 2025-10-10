import Image from "next/image";

export default function Header() {
  return (
    <div className="flex w-full lg:gap-[25%] gap-4 justify-center items-center h-20 border-b border-gray-200">
      <Image
        src="/header/start.png"
        alt="Start Trainer Oficial"
        width={1000}
        height={300}
        draggable={false}
        className="w-full max-w-[150px] h-auto object-cover lg:ml-12"
      />
      <div className="flex gap-4">
        <button className="px-3 lg:px-5 py-1 rounded-xl lg:text-base text-sm text-[#5f2daf] border border-[#5f2daf] 
  font-semibold transition-all duration-300 cursor-pointer hover:bg-gradient-to-r from-[#5f2daf] 
  via-[#733df2] to-[#9b4bff] hover:text-white hover:border-transparent">
          Entrar
        </button>

        <button className="px-3 lg:px-5  py-1 lg:text-base text-sm rounded-xl text-white font-semibold 
  bg-gradient-to-r from-[#5f2daf] via-[#733df2] to-[#9b4bff]
  transition-all cursor-pointer duration-300 hover:brightness-90">
          Registre-se
        </button>
      </div>

    </div>
  );
}
