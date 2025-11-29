import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Controle de Projetos",
  icons: {
    icon: "/assets/favicon/favicon.ico",
  },
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`flex flex-col min-h-screen ${poppins.className}`}>
        <main className="flex-1">{children}</main>

        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
