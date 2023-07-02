"use client";

import React, { useState } from "react";
import Link from "next/link";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import Logo from "../../assets/img/logo/logo.png";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isSideBar, setIsSideBar] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white text-black shadow-lg fixed top-0">
      <Container maxWidth="md">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              className="inline md:w-[110px] w-[90px]"
            />
          </Link>
          <div className="text-lg transition duration-200 hidden md:inline">
            <Link href="/products" className="mr-2 navbar-link">
              Products
            </Link>
            <Link href="/about" className="mr-2 navbar-link">
              About
            </Link>
            <button className="navbar-link-logout" onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
          <div
            className="md:hidden inline cursor-pointer"
            onClick={() => setIsSideBar((prev) => (!isSideBar ? true : false))}
          >
            <DensityMediumIcon sx={{ color: "black" }} />
          </div>
        </div>
      </Container>
      {isSideBar && (
        <div className={`toggle-menu ${isSideBar ? "active" : "inactive"}`}>
          <div
            className={`navbar-toggle-menu ${
              isSideBar ? "active" : "inactive"
            }`}
            onClick={() => setIsSideBar((prev) => (!isSideBar ? true : false))}
          >
            <CloseIcon
              sx={{ color: "black", fontSize: "2.2rem", cursor: "pointer" }}
              onClick={() =>
                setIsSideBar((prev) => (!isSideBar ? true : false))
              }
            />
          </div>
          <div className="toggle-links">
            <ul className="toggle-links-menu text-md text-center">
              <li className="my-5">
                <Link href="/products" className="navbar-link text-lg">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="navbar-link text-lg">
                  About
                </Link>
              </li>
              <li className="absolute bottom-6">
                <button
                  href="/about"
                  className="navbar-link-logout"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
