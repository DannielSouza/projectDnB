import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DnB | Minha conta",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
