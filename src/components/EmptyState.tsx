import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({
  message = "No items",
}: {
  message?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
  text: { color: "#666" },
});
