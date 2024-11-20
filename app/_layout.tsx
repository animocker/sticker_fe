import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/legal" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
