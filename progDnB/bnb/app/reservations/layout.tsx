import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DnB | Minhas reservas",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
