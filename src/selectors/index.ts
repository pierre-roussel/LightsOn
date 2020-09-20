import { NanoLeafState } from "../helpers/nano/types";

export const selectLightOnState = (state: NanoLeafState) =>
  state.state.on.value;
