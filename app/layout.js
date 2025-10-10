"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "./store";
import Footer from "@/component/footer/Footer";
import Navbar from "@/component/nav/NavBar";
import Top from "@/component/nav/TopNav";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminDashboard = pathname === "/dashboard/admin";

  return (
    <html lang="en">
      <SessionProvider>
        <Provider store={store}>
          <body className={inter.className}>
            <ToastContainer />
            {!isAdminDashboard && (
              <>
                <Top />
                <Navbar />
              </>
            )}
            {children}
            {!isAdminDashboard && <Footer />}
          </body>
        </Provider>
      </SessionProvider>
    </html>
  );
}