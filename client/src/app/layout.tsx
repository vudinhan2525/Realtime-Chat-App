import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("jwt");
  return (
    <html lang="en" className="overflow-hidden">
      <body className={roboto.className}>
        <AppProvider initialSessionToken={sessionToken?.value}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
