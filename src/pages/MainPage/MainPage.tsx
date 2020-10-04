// Vendor
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

// Internal
import { CtxNanoleaf } from "../../contexts/CtxNanoleaf";
import { CtxNanoleafState } from "../../contexts/CtxNanoleafState";
import { InfoBox } from "../../components/InfoBox";
import { selectLightOnState } from "../../selectors";
import { Switch } from "../../components/Switch";
import {
  LIGHT_ON_SHADE,
  LIGHT_OFF_SHADE,
  CONNECTION_ERROR_SHADE,
  WAITING_FOR_RESPONSE,
} from "./constants";

const MainPage = () => {
  // Hooks
  const fetched = useRef(false);
  const nano = useContext(CtxNanoleaf);
  const nanoState = useContext(CtxNanoleafState);
  const [error, setError] = useState(false);

  // Setup
  const currentLightState = selectLightOnState(nanoState.state);

  // Handlers
  const getBackgroundColor = () => {
    if (!fetched) return WAITING_FOR_RESPONSE;
    if (error) return CONNECTION_ERROR_SHADE;

    return currentLightState ? LIGHT_ON_SHADE : LIGHT_OFF_SHADE;
  };

  const onPair = () => {
    try {
      nano?.pair();
    } catch (e) {
      console.log(e);
    }
  };

  // Styles
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      alignItems: "center",
      backgroundColor: getBackgroundColor(),
      justifyContent: "center",
    },
  });

  // useEffect
  React.useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      nano?.getNanoInfos().then((s) => {
        if (s) return nanoState.update(s);
        setError(true);
      });
    }
  }, []);

  return (
    <View style={styles.main}>
      <Switch />
      <InfoBox />
    </View>
  );
};

export { MainPage };
