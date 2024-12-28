import type { Metadata } from "next";
import { Geist_Mono, Afacad } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const afacad = Afacad({
    subsets: ["latin"],
    variable: "--font-afacad",
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Orange Bridge",
    description: "Cross-chain token bridge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${afacad.variable} ${geistMono.variable} font-sans antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
