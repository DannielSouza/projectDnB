import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DnB | Minhas viagens",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
