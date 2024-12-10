import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'highlight.js/styles/atom-one-dark.css'; // Highlight.js theme


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


