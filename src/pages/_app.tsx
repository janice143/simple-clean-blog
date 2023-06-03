import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useState } from "react";
import { inputValContext } from "./context/inputValContext";

export default function App({ Component, pageProps }: AppProps) {
  const [inputVal, setInputVal] = useState<string>();
  const handleInput = (val: string) => {
    setInputVal(val);
  };
  return (
    <ThemeProvider attribute="class">
      <div className="app-container">
        <Navbar handleInput={handleInput} />
        <div className="flex flexDirectCol" style={{ minHeight: "80vh" }}>
          <inputValContext.Provider value={inputVal}>
            <Component {...pageProps} />
          </inputValContext.Provider>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
