"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../avatar/Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import useUserAuth from "@/app/hooks/useUserAuth";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  const onRent = () => {
    if (!currentUser) return loginModal.onOpen();

    return rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold text-center py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Adicionar propriedade
        </div>
        <div
          onClick={toggleMenu}
          className="p-4 z-30 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!currentUser ? (
              <>
                <MenuItem label="Entrar" onclick={loginModal.onOpen} />
                <MenuItem label="Cadastrar" onclick={registerModal.onOpen} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Minha conta"
                  onclick={() => router.push("/user")}
                />
                <MenuItem
                  label="Minhas viagens"
                  onclick={() => router.push("/trips")}
                />
                <MenuItem
                  label="Minhas reservas"
                  onclick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="Minhas casas"
                  onclick={() => {
                    router.push("/properties");
                  }}
                />
                <MenuItem
                  label="Favoritos"
                  onclick={() => router.push("/favorites")}
                />
                <MenuItem label="Adicionar propriedade" onclick={onRent} />
                <hr />
                <MenuItem label="Sair" onclick={() => userAuth.onLogOut()} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
