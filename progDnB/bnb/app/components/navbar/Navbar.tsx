"use client";

import React, { useEffect } from "react";
import Container from "../container/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import Cookies from "js-cookie";
import useUserAuth from "@/app/hooks/useUserAuth";
import axios from "axios";

const Navbar = () => {
  const { onLogin, onSuccessLoad } = useUserAuth();

  useEffect(() => {
    autoLogin();
  }, []);

  const autoLogin = async () => {
    try {
      const authToken = Cookies.get("DNB-AUTH");
      if (typeof authToken !== "string") return;

      const response = await axios.post(
        `http://localhost:4000/auth/token/${authToken}`
      );
      onLogin({ ...response.data, id: response.data._id });
    } catch (error) {
      console.error(error);
    } finally {
      onSuccessLoad();
    }
  };

  axios.defaults.withCredentials = true;

  return (
    <header className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px] z-30">
        <Container>
          <div className="flex flex-row z-20 items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  );
};

export default Navbar;
