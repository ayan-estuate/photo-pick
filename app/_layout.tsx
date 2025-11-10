// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1976D2" },
          headerTintColor: "#fff",
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}
