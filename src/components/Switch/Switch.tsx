// Vendor
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

// Internal
import { CtxNanoleaf } from "../../contexts/CtxNanoleaf";
import { CtxNanoleafState } from "../../contexts/CtxNanoleafState";
import { selectLightOnState } from "../../selectors";
import {
  LIGHT_OFF_SHADE,
  LIGHT_ON_SHADE,
} from "../../pages/MainPage/constants";

export interface SwitchProps {}

const Switch = (_props: SwitchProps) => {
  // Hooks
  const nano = useContext(CtxNanoleaf);
  const nanoState = useContext(CtxNanoleafState);

  // Setup
  const currentLightState = selectLightOnState(nanoState.state);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: currentLightState ? LIGHT_OFF_SHADE : LIGHT_ON_SHADE,
      borderRadius: 50,
      justifyContent: "center",
      marginTop: "1%",
      marginBottom: "1%",
      padding: "10%",
      minWidth: "65%",
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
        Turn {currentLightState ? "off" : "on"} Nanoleaf
      </Text>
    </View>
  );
};

export { Switch };
