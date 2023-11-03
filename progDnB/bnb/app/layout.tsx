import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";

import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import RatingModal from "./components/modals/RatingModal";
import ImageModal from "./components/modals/ImageModal";
import { Metadata } from "next";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DnB | Inicio",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/dnbIcon2.svg",
        href: "/images/dnbIcon2.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/dnbIcon2.svg",
        href: "/images/dnbIcon2.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" title="Air dnb">
      <body className={font.className}>
        <RatingModal />
        <ToasterProvider />
        <RegisterModal />
        <RentModal />
        <LoginModal />
        <SearchModal />
        <ImageModal />

        <Navbar />

        <>
          <div className={`pb-20 pt-28`}>{children}</div>
        </>
      </body>
    </html>
  );
}
