import { Metadata, Viewport } from "next";

import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import { FloatingNav } from "@/components/ui/floating-navbar";

import { Inter } from "next/font/google"; // Import Inter from Google Fonts
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Emerge X",
  description: "Emerge-x Website",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <div className="flex flex-col min-h-screen relative">
            {/* <NavBar /> */}
            <FloatingNav navItems={navItems} />
            <div className="flex-1">
              <Toaster />
              {children}
            </div>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
