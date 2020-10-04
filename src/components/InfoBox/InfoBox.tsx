// Vendor
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Internal
import { CtxNanoleaf } from "../../contexts/CtxNanoleaf";

export interface InfoBoxProps {}

const InfoBox = (_props: InfoBoxProps) => {
  // Hooks
  const nano = useContext(CtxNanoleaf);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: "#3D3B8E",
      borderRadius: 50,
      justifyContent: "center",
      marginTop: "1%",
      marginBottom: "1%",
      padding: "10%",
      minWidth: "65%",
    },
    text: {
      color: "#fff",
    },
  });

  const renderConnectedState = () => {
    const address = nano?.getAddress();

    if (!address) return "No nanoleaf connected";

    return `Connected to: ${address}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{renderConnectedState()}</Text>
    </View>
  );
};

export { InfoBox };
