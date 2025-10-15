import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { LoginModalProvider } from "@/context/loginModalContext";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import LoginModal from "@/components/modals/LoginModal";


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
    <html lang="pt-br">
      <body>

        <AuthProvider>
          <LoginModalProvider>
            <Header />
            {children}
            <Footer />
            <LoginModal />
          </LoginModalProvider>
        </AuthProvider>

      </body>
    </html >
  );
}
