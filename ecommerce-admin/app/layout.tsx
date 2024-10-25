import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { Inter } from 'next/font/google'


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
          <ModalProvider />
          <body className={inter.className}>
               {children}
          </body>
      </html>
  </ClerkProvider>
  );
}
