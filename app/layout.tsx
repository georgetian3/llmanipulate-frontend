import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { StateProvider } from "./context/StateContext"; // Import StateProvider

// Load custom fonts
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Define site metadata
export const metadata: Metadata = {
    title: "LLManipulate",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {/* Wrap application with the global state provider */}
        <StateProvider>{children}</StateProvider>
        </body>
        </html>
    );
}