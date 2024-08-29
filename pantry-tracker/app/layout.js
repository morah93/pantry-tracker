import { Inter } from "next/font/google";
import "./globals.css";
import { firebaseConfig } from "../firebase";
// import { FirebaseAppProvider } from "reactfire";
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script> */}
      {/* <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" /> */}
        <body className={inter.className}>{children}</body>
      </html>
  );
}
