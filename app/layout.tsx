import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUCCESS — Next-Gen AI Image Generator",
  description:
    "Create studio-grade visuals, photorealistic imagery, and digital art with neural intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-black text-zinc-100 selection:bg-white selection:text-black font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
