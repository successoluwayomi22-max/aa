import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Success Oluwayomi — Web & App Developer",
  description:
    "Portfolio of Success Oluwayomi — Full-Stack Web & Mobile App Developer specializing in high-performance web applications, cross-platform mobile apps, and scalable digital systems.",
  keywords: [
    "Success Oluwayomi",
    "Web Developer",
    "App Developer",
    "Mobile App Developer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "React Native",
    "Flutter",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Success Oluwayomi" }],
  openGraph: {
    title: "Success Oluwayomi — Web & App Developer",
    description:
      "Crafting high-performance web platforms, cross-platform mobile apps, and scalable digital software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-black text-zinc-100 selection:bg-[#ff5722] selection:text-white font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
