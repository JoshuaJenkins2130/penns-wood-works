import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { UnifrakturCook } from "next/font/google";

const oldEnglish = UnifrakturCook({
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Penn's Wood Works",
  description: "Handcrafted wood products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
