import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Resume Builder",
    description:
        "Build your ATS-optimized resume with a modern, black and white interface.",
    icons: {
        icon: [
            {
                url: "/images/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png"
            },
            {
                url: "/images/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png"
            },
            {
                url: "/images/favicon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                url: "/images/favicon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "/images/favicon-180x180.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
