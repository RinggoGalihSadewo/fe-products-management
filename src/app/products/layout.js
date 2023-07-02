"use client";

import "../../assets/css/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Container from "@mui/material/Container";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>List Products - Products Management</title>
      <body className={inter.className}>
        <Navbar />
        <Container maxWidth="md">
          <main className="my-10">{children}</main>
        </Container>
      </body>
    </html>
  );
}
