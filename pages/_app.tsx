import { AuthProvider } from "@/hooks/useAuth";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}
