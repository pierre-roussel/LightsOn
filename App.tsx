// Vendor
import React from "react";

// Internal
import { CtxNanoleafProvider } from "./src/components/CtxNanoleaf";
import { MainPage } from "./src/pages/MainPage";
import { NanoLeaf } from "./src/helpers/nano/nanoleaf";

export default function App() {
  const nanoRef = new NanoLeaf({ address: "192.168.1.50" });

  return (
    <CtxNanoleafProvider value={nanoRef}>
      <MainPage />
    </CtxNanoleafProvider>
  );
}
