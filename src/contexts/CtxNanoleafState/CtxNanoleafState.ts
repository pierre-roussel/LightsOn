// Vendor
import React, { Dispatch, SetStateAction } from "react";

// Internal
import { NanoLeafState } from "../../helpers/nano/types";

const defaultLeafValue: NanoLeafState = {
  name: "",
  serialNo: "",
  manufacturer: "",
  firmwareVersion: "",
  model: "",
  state: {
    on: {
      value: false,
    },
    brightness: {
      value: 0,
      max: 0,
      min: 0,
    },
    hue: {
      value: 0,
      max: 0,
      min: 0,
    },
    sat: {
      value: 0,
      max: 0,
      min: 0,
    },
    ct: {
      value: 0,
      max: 0,
      min: 0,
    },
    colorMode: "",
  },
  effects: {
    select: "",
    effectsList: [],
  },
  panelLayout: {
    layout: {
      numPanels: 0,
      sideLength: 0,
      positionData: [],
    },
    globalOrientation: {
      value: 0,
      max: 0,
      min: 0,
    },
  },
  rhythm: {
    rhythmConnected: false,
    rhythmActive: null,
    rhythmId: null,
    hardwareVersion: null,
    firmwareVersion: null,
    auxAvailable: null,
    rhythmMode: null,
    rhythmPos: null,
  },
};

const update: Dispatch<SetStateAction<NanoLeafState>> = () => {};

export const defaultValue = {
  state: defaultLeafValue,
  update,
};

const CtxNanoleafState = React.createContext(defaultValue);

const {
  Consumer: CtxNanoleafStateConsumer,
  Provider: CtxNanoleafStateProvider,
} = CtxNanoleafState;

export { CtxNanoleafState, CtxNanoleafStateConsumer, CtxNanoleafStateProvider };
