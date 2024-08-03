import { Inter } from "next/font/google";
import "./globals.css";
import { firebaseConfig } from "@/firebase";
// import { FirebaseAppProvider } from "reactfire";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
