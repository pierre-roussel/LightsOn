// Vendor
import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

// Internal
import { CtxNanoleaf } from "../../components/CtxNanoleaf";

function MainPage() {
  // Hooks
  const nano = useContext(CtxNanoleaf);

  // Handlers
  const onPair = () => {
    try {
      nano?.pair();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Main Page</Text>
      <Text>{nano?.getAddress()}</Text>
      <Text>{nano?.getAuthToken()}</Text>
      <Button title="Pair" onPress={onPair} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { MainPage };
