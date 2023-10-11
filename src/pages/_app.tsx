import { Header } from "@/components"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"
import React from "react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Header />
      <Component {...pageProps} />
    </main>
  )
}
