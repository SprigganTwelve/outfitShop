import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { Inter } from 'next/font/google'
import { TaosterProvider } from "@/providers/tast-provider";


const inter = Inter({ subsets: ['latin']  })

export const metadata: Metadata = {
  title: "Admin Dashborad",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
      <html lang="en">
          <body className={inter.className}>
          <TaosterProvider />
          <ModalProvider />
               {children}
          </body>
      </html>
  </ClerkProvider>
  );
}
