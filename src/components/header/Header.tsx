"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";

import Image from "next/image";

import { HiOutlineTicket } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { useLoginModal } from "@/context/loginModalContext";
import ProfileDropdown from "./ProfileDropdown";
import MyEventsModal from "../modals/MyEventsModal";
import { useRegisterModal } from "@/context/registerModalContext";

export default function Header() {
  const { user, logout, hydrated } = useAuth();

  const { openModal } = useLoginModal();
  const {openModal: openRegisterModal} = useRegisterModal();
  const [openModalMyEvents, setOpenModalMyEvents] = useState(false);

  if (!hydrated) return null;

  return (
    <div className="flex w-full lg:gap-[10%] gap-4 justify-center items-center h-20 border-b border-gray-200">

      <Image
        src="/header/start.png"
        alt="Start Trainer Oficial"
        width={1000}
        height={227}
        quality={100}
        draggable={false}
        className="w-full max-w-[150px] h-auto object-contain lg:ml-12"
      />

      <span className="font-semibold select-none hidden lg:flex">O movimento que conecta.</span>

      {!user ? (
        <div className="flex gap-4">
          <button onClick={() => openModal()} className="px-3 lg:px-5 py-1 rounded-sm lg:text-base text-sm text-black border border-black/10
  font-semibold transition-all duration-300 cursor-pointer hover:bg-[#5cffb8] hover:text-black hover:border-transparent">
            Entrar
          </button>

          <button onClick={() => openRegisterModal()} className="px-3 lg:px-5 py-1 lg:text-base text-sm rounded-md text-black font-semibold 
  bg-[#5cffb8]
  transition-all cursor-pointer duration-300 hover:brightness-90">
            Registre-se
          </button>

        </div>
      ) : (
        <div className="flex gap-2 ml-6 items-center">
          <ProfileDropdown
            user={{ name: `${user.name}`, email: `${user.email}`, avatarUrl: "/header/userIcon.png" }}
            menuItems={[
              {
                label: (
                  <>
                    <div className="flex gap-2 text-black/70">
                      <HiOutlineTicket size={18} className="text-[#3b197d]" />
                      Meus eventos
                    </div>
                  </>
                ),
                onClick: () => setOpenModalMyEvents(true),
              },
              {
                label: (
                  <>
                    <div className="flex gap-2 text-black/70">
                      <CiLogout size={17} className="text-[#3b197d]" />
                      Sair
                    </div>
                  </>
                ),
                onClick: () => logout(),
              }
            ]}
          />

        </div>
      )}

      <MyEventsModal openModalEvents={openModalMyEvents} setOpenModalEvents={setOpenModalMyEvents} />

    </div>
  );
}
