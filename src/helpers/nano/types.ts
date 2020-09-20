export interface NanoLeafState {
  name: string;
  serialNo: string;
  manufacturer: string;
  firmwareVersion: string;
  model: string;
  state: {
    on: {
      value: boolean;
    };
    brightness: {
      value: number;
      max: number;
      min: number;
    };
    hue: {
      value: number;
      max: number;
      min: number;
    };
    sat: {
      value: number;
      max: number;
      min: number;
    };
    ct: {
      value: number;
      max: number;
      min: number;
    };
    colorMode: string;
  };
  effects: {
    select: string;
    effectsList: string[];
  };
  panelLayout: {
    layout: {
      numPanels: number;
      sideLength: number;
      positionData: {
        panelId: number;
        x: number;
        y: number;
        o: number;
        shapeType?: number;
      }[];
    };
    globalOrientation: {
      value: number;
      max: number;
      min: number;
    };
  };
  rhythm: {
    rhythmConnected: boolean;
    rhythmActive: boolean | null;
    rhythmId: number | null;
    hardwareVersion: string | null;
    firmwareVersion: string | null;
    auxAvailable: boolean | null;
    rhythmMode: number | null;
    rhythmPos: { x: number; y: number; o: number } | null;
  };
}
