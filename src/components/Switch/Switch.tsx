// Vendor
import React, { useContext, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Switch as RSwitch,
} from "react-native";

// Internal
import { CtxNanoleaf } from "../../components/CtxNanoleaf";
import { CtxNanoleafState } from "../CtxNanoleafState/CtxNanoleafState";
import { selectLightOnState } from "../../selectors";

export interface SwitchProps {}

const Switch = (_props: SwitchProps) => {
  // Hooks
  const fetched = useRef(false);
  const nano = useContext(CtxNanoleaf);
  const nanoState = useContext(CtxNanoleafState);

  // Setup
  const currentLightState = selectLightOnState(nanoState.state);

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

  // useEffect
  React.useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      console.log("get infos");
      nano?.getNanoInfos().then((s) => {
        if (s) nanoState.update(s);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <RSwitch onValueChange={onSetLight} value={currentLightState} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Switch };
