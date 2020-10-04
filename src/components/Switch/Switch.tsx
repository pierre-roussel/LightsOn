// Vendor
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Internal
import { CtxNanoleaf } from "../../components/CtxNanoleaf";
import { CtxNanoleafState } from "../CtxNanoleafState/CtxNanoleafState";
import { selectLightOnState } from "../../selectors";
import {
  LIGHT_OFF_SHADE,
  LIGHT_ON_SHADE,
} from "../../pages/MainPage/constants";

export interface SwitchProps {}

const Switch = (_props: SwitchProps) => {
  // Hooks
  const fetched = useRef(false);
  const nano = useContext(CtxNanoleaf);
  const nanoState = useContext(CtxNanoleafState);

  // Setup
  const currentLightState = selectLightOnState(nanoState.state);

  const styles = StyleSheet.create({
    container: {
      borderRadius: 50,
      padding: "15%",
      backgroundColor: currentLightState ? LIGHT_OFF_SHADE : LIGHT_ON_SHADE,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  // Handlers
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
    <View onTouchStart={onSetLight} style={styles.container}>
      <Text style={{ color: currentLightState ? "#fff" : "#000" }}>
        Turn {currentLightState ? "off" : "on"}{" "}
      </Text>
    </View>
  );
};

export { Switch };
