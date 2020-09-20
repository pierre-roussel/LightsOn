// Vendor
import React from "react";

// Internal
import { CtxNanoleafProvider } from "./src/components/CtxNanoleaf";
import {
  CtxNanoleafStateProvider,
  defaultValue,
} from "./src/components/CtxNanoleafState";
import { MainPage } from "./src/pages/MainPage";
import { NanoLeaf } from "./src/helpers/nano/nanoleaf";

export default function App() {
  // Setup
  const nanoRef = new NanoLeaf({ address: "192.168.1.50" });

  // Hooks
  const [nano, setNano] = React.useState(defaultValue.state);

  return (
    <CtxNanoleafProvider value={nanoRef}>
      <CtxNanoleafStateProvider value={{ state: nano, update: setNano }}>
        <MainPage />
      </CtxNanoleafStateProvider>
    </CtxNanoleafProvider>
  );
}
