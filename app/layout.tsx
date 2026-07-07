import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = "https://www.kurtkroll.dev";
const TITLE = "Kurt Kroll | Full Stack Software Engineer";
const DESCRIPTION =
  "Full-stack developer building simulation tools and research dashboards for fantasy sports.";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  // Resolves relative URLs (OG image, canonical) to absolute for crawlers.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Kurt Kroll",
  },
  description: DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "kurtkroll.dev",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Kurt Kroll — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
};

// schema.org Person — helps search engines connect the name to the profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kurt Kroll",
  url: SITE_URL,
  jobTitle: "Full Stack Software Engineer",
  description: DESCRIPTION,
  sameAs: [
    "https://github.com/truk8280",
    "https://www.linkedin.com/in/kurt-kroll",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
