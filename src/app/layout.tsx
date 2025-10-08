import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Start Trainer Oficial ®",
  icons: {
    icon: "/logos/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
