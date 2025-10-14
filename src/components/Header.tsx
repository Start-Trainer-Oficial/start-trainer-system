"use client";

import { useState } from "react";
import Image from "next/image";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";

import { useAuth } from "@/context/authContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  const { user, logout } = useAuth();

  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);


  return (
    <div className="flex w-full lg:gap-[10%] gap-4 justify-center items-center h-20 border-b border-gray-200">

      <Image
        src="/header/start.png"
        alt="Start Trainer Oficial"
        width={1000}
        height={300}
        draggable={false}
        className="w-full max-w-[150px] h-auto object-cover lg:ml-12"
      />
      <div className="hidden lg:flex gap-8">
        <Image
          src="/header/trekkingLogo.png"
          alt="Start Trainer Oficial"
          width={1000}
          height={300}
          draggable={false}
          className="w-full max-w-[80px] h-auto object-contain"
        />
        <Image
          src="/header/runnersLogo.png"
          alt="Start Trainer Oficial"
          width={1490}
          height={305}
          draggable={false}
          className="w-full max-w-[100px] h-auto object-contain"
        />
        <Image
          src="/header/institutoLogo.png"
          alt="Start Trainer Oficial"
          width={1000}
          height={300}
          draggable={false}
          className="w-full max-w-[80px] h-auto object-contain"
        />
      </div>

      {!user ? (
        <div className="flex gap-4">
          <button onClick={() => setOpenModalLogin(true)} className="px-3 lg:px-5 py-1 rounded-xl lg:text-base text-sm text-[#5f2daf] border border-[#5f2daf] 
  font-semibold transition-all duration-300 cursor-pointer hover:bg-gradient-to-r from-[#5f2daf] 
  via-[#733df2] to-[#9b4bff] hover:text-white hover:border-transparent">
            Entrar
          </button>

          <LoginModal openModalLogin={openModalLogin} setOpenModalLogin={setOpenModalLogin} />

          <button onClick={() => setOpenModalRegister(true)} className="px-3 lg:px-5  py-1 lg:text-base text-sm rounded-xl text-white font-semibold 
  bg-gradient-to-r from-[#5f2daf] via-[#733df2] to-[#9b4bff]
  transition-all cursor-pointer duration-300 hover:brightness-90">
            Registre-se
          </button>

          <RegisterModal openModalRegister={openModalRegister} setOpenModalRegister={setOpenModalRegister} />

        </div>
      ) : (
        <div className="flex gap-2 ml-6 items-center">
          <ProfileDropdown
            user={{ name: `${user.name}`, email: `${user.email}`, avatarUrl: "/header/userIcon.png" }}
            menuItems={[
              { label: "Meus eventos", onClick: () => console.log("Editar perfil") },
              { label: "Sair", onClick: () => logout() },
            ]}
          />

        </div>
      )}

    </div>
  );
}
