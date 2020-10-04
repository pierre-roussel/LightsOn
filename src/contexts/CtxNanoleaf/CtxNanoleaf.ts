// Vendor
import React from "react";

// Internal
import { NanoLeaf } from "../../helpers/nano/nanoleaf";

const defaultValue: NanoLeaf | null = null;

const CtxNanoleaf = React.createContext<null | NanoLeaf>(defaultValue);

const {
  Consumer: CtxNanoleafConsumer,
  Provider: CtxNanoleafProvider,
} = CtxNanoleaf;

export { CtxNanoleaf, CtxNanoleafConsumer, CtxNanoleafProvider };
