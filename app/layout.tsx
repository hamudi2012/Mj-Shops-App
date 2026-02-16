import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MJ-Shops | Fashion Sultan Harga Rakyat",
  description: "Koleksi fashion terbaik kualitas butik harga tetangga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
