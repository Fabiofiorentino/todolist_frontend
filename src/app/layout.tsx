"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <html>
      <body>
        {!hideNavbarRoutes.includes(pathname) && <Navbar />}
        {children}
      </body>
    </html>
  );
};

export default Layout;
