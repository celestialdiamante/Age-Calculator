import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from "next/font/google";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "400 700 800",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const fontPoppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "800"], style: 'italic' });

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "created by kaifi azmi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // ${geistSans.variable} ${geistMono.variable}
        className={`bg-[#f0f0f0] ${fontPoppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
