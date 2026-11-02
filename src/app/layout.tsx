import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANRIKA DIGITAL INNOVATION — Digital Creative Studio | Est. 2026",
  description:
    "We transform creative ideas into powerful digital experiences. Next-generation website development, Meta Ads, cinematic photography & videography, and creative advertising.",
  keywords: [
    "Anrika Digital Innovation",
    "Digital Creative Studio 2026",
    "Website Development",
    "Meta Ads Agency",
    "Commercial Photography",
    "Brand Storytelling",
    "Videography",
    "Performance Marketing",
    "SEO & Digital Strategy",
  ],
  authors: [{ name: "ANRIKA DIGITAL INNOVATION" }],
  creator: "ANRIKA DIGITAL INNOVATION",
  metadataBase: new URL("https://anrikadigital.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anrikadigital.com",
    title: "ANRIKA DIGITAL INNOVATION — We Create Digital Experiences",
    description:
      "Luxury editorial digital marketing agency combining modern web development, Meta ads, photography, and brand storytelling. Established 2026.",
    siteName: "ANRIKA DIGITAL INNOVATION",
    images: [
      {
        url: "/images/anrika-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "ANRIKA DIGITAL INNOVATION — Official Atelier Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANRIKA DIGITAL INNOVATION",
    description: "We Create Digital Experiences. Website Development, Meta Ads, Commercial Media & Creative Advertising.",
    images: ["/images/anrika-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/anrika-emblem.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/anrika-emblem.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#E8DCC6] text-[#342A29] antialiased selection:bg-[#722F37] selection:text-[#E8DCC6] min-h-screen relative paper-grain">
        {children}
      </body>
    </html>
  );
}
