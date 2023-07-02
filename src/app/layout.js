import "../assets/css/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login - Products Management",
  description: "Products Management",
  author: "Ringgo Galih Sadewo, S.Kom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Login - Products Management</title>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
