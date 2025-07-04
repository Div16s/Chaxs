import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessionProvider from "@/providers/sessionProvider";
import { Toaster } from "@/components/ui/sonner"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chaxs",
  description: "A modern, real-time scalable chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider >
        <body
          className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)} 
        >
          {children}
          <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "bg-white text-gray-800 shadow-lg",
            duration: 5000,
            style: {
              fontSize: "16px",
              padding: "12px 20px",
            },
          }}
        />
        </body>
      </SessionProvider>
    </html>
  );
}
