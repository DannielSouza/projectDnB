import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DnB | Meus favoritos",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
