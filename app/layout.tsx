"use client"

import { useState, type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [dark, setDark] = useState(false)
  return <html className={dark ? "dark" : "light"}>
    <body>
      <StoreProvider>
        <nav>
          <button onClick={() => setDark(!dark)}>Light/Dark</button>
        </nav>
        {children}
      </StoreProvider>
    </body>
  </html>
}
