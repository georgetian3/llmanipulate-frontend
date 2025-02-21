import { useState, type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import { Viewport } from "next";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";

interface Props {
  readonly children: ReactNode;
}

// export default function RootLayout({ children }: Props) {
//   const [dark, setDark] = useState(false)
//   return <html className={dark ? "dark" : "light"}>
//     <body>
//         <nav>
//           <button onClick={() => setDark(!dark)}>Light/Dark</button>
//         </nav>
//         {children}
//     </body>
//   </html>
// }


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <StoreProvider>

          <div className="h-screen">
            <Navbar />
            <main className="container h-[calc(100vh-4rem)] mx-auto">
              {children}
            </main>
          </div>
        </StoreProvider>

      </body>
    </html>
  );
}
