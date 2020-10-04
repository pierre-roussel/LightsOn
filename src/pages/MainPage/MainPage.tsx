// Vendor
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Internal
import { Spring, animated } from "react-spring/renderprops";
import { CtxNanoleaf } from "../../components/CtxNanoleaf";
import { CtxNanoleafState } from "../../components/CtxNanoleafState/CtxNanoleafState";
import { selectLightOnState } from "../../selectors";
import { Switch } from "../../components/Switch/Switch";
import {
  LIGHT_ON_SHADE,
  LIGHT_OFF_SHADE,
  CONNECTION_ERROR_SHADE,
  WAITING_FOR_RESPONSE,
} from "./constants";

const AnimatedView = animated(View);

const MainPage = () => {
  // Hooks
  const fetched = useRef(false);
  const nano = useContext(CtxNanoleaf);
  const nanoState = useContext(CtxNanoleafState);
  const [error, setError] = useState(false);

  // Setup
  const currentLightState = selectLightOnState(nanoState.state);

  const styles = {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  };

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

  console.log(currentLightState);
  console.log(getBackgroundColor());

  return (
    <Spring
      native
      to={{
        ...styles.container,
        backgroundColor: getBackgroundColor(),
      }}
    >
      {(props) => (
        <AnimatedView style={props}>
          <Text>Main Page</Text>
          <Text>{nano?.getAddress()}</Text>
          <Text>{nano?.getAuthToken()}</Text>
          <Switch />
        </AnimatedView>
      )}
    </Spring>
  );
};

export { MainPage };
