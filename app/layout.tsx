import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Kurt Kroll | Full Stack Software Engineer",
  description:
    "Full-stack developer building simulation tools and research dashboards for fantasy sports.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-page">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
