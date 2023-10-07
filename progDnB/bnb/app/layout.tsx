"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";

import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import useUserAuth from "./hooks/useUserAuth";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Loading from "./loading";
import RatingModal from "./components/modals/RatingModal";
import ImageModal from "./components/modals/ImageModal/ImageModal";

export const metadata: Metadata = {
  title: "Air dnb",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAuth = useUserAuth();
  const { currentUser, onSuccessLoad, isLoaded } = userAuth;
  axios.defaults.withCredentials = true;

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
      userAuth.onLogin({ ...response.data, id: response.data._id });
    } catch (error) {
      console.error(error);
    } finally {
      onSuccessLoad();
    }
  };

  return (
    <html lang="pt-BR" title="Air dnb">
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        {!isLoaded ? (
          <Loading />
        ) : (
          <>
            <RatingModal />
            <ToasterProvider />
            <RegisterModal />
            <RentModal />
            <LoginModal />
            <SearchModal />
            <ImageModal />
            <div className="pb-20 pt-28">{children}</div>
          </>
        )}
      </body>
    </html>
  );
}
