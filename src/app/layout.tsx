import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

import { Inter } from "next/font/google";

import { LoginModalProvider } from "@/context/loginModalContext";
import LoginModal from "@/components/modals/LoginModal";
import { RegisterModalProvider } from "@/context/registerModalContext";
import RegisterModal from "@/components/modals/RegisterModal";
import { ForgotPasswordProvider } from "@/context/password/forgotPasswordModalContext";
import ForgotPasswordModal from "@/components/modals/password/ForgotPasswordModal";
import { ResetPasswordProvider } from "@/context/password/resetModalContext";
import ResetCodeModal from "@/components/modals/password/ResetCodeMailModal";
import { ChangePasswordModalProvider } from "@/context/password/changePasswordModalContext";
import ChangePasswordModal from "@/components/modals/password/ChangePassword";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="pt-br" className={inter.className}>
      <body>

        <AuthProvider>
          <LoginModalProvider>
            <RegisterModalProvider>
              <ForgotPasswordProvider>
                <ResetPasswordProvider>
                  <ChangePasswordModalProvider>
                    <Header />
                    {children}
                    <Footer />
                    <LoginModal />
                    <RegisterModal />
                    <ForgotPasswordModal />
                    <ResetCodeModal />
                    <ChangePasswordModal />
                  </ChangePasswordModalProvider>
                </ResetPasswordProvider>
              </ForgotPasswordProvider>
            </RegisterModalProvider>
          </LoginModalProvider>
        </AuthProvider>

      </body>
    </html >
  );
}
