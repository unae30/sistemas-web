import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} font-sans`}>
        <div className="min-h-screen bg-[#ecf0f5]">{children}</div>
      </body>
    </html>
  );
}
