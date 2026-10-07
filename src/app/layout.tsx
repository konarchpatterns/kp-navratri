import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vadodara Vibrant Navratri 2026",
  description:
    "Experience Vadodara's biggest Navratri celebration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}