// Vendor
import React, { useContext, useRef, useState } from "react";
import { Text, View } from "react-native";

// Internal
import { Spring, animated } from "react-spring/renderprops";
import { CtxNanoleaf } from "../../components/CtxNanoleaf";
import { CtxNanoleafState } from "../CtxNanoleafState/CtxNanoleafState";
import { selectLightOnState } from "../../selectors";
import {
  LIGHT_OFF_SHADE,
  LIGHT_ON_SHADE,
} from "../../pages/MainPage/constants";

const AnimatedViewSwitch = animated(View);

export interface SwitchProps {}

const Switch = (_props: SwitchProps) => {
  // Hooks
  const nano = useContext(CtxNanoleaf);
  const nanoState = useContext(CtxNanoleafState);
  const [isPressed, setIsPressed] = useState(false);

  // Setup
  const currentLightState = selectLightOnState(nanoState.state);

  const styles = {
    container: {
      borderRadius: 50,
      padding: isPressed ? "25%" : "15%",
      backgroundColor: currentLightState ? LIGHT_OFF_SHADE : LIGHT_ON_SHADE,
      alignItems: "center",
      justifyContent: "center",
    },
    text: { color: currentLightState ? "#fff" : "#000" },
  };

  // Handlers
  const onTouchStart = () => {
    onSetLight();
    setIsPressed(true);
  };

  const onTouchEnd = () => {
    setIsPressed(false);
  };

  const onSetLight = async () => {
    try {
      await nano?.setLightsState(!currentLightState);
      const state = await nano?.getNanoInfos();
      if (state) nanoState.update(state);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Spring native to={{ ...styles.container }}>
      {(props) => (
        <AnimatedViewSwitch
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={props}
        >
          <Text style={styles.text}>
            Turn {currentLightState ? "off" : "on"}{" "}
          </Text>
        </AnimatedViewSwitch>
      )}
    </Spring>
  );
};

export { Switch };
