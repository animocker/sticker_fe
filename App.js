import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStartScreen from "./screens/auth/AuthStartScreen";
import AuthLegalScreen from "./screens/auth/AuthLegalScreen";
import AuthLoginScreen from "./screens/auth/AuthLoginScreen";
import OnboardingStartScreen from "./screens/onboarding/OnboardingStartScreen";
import OnboardingSelfieScreen from "./screens/onboarding/OnboardingSelfieScreen";
import OnboardingManualCreateCharacterScreen from "./screens/onboarding/OnboardingManualCreateCharacterScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStart"
      >
        <Stack.Screen name="AuthStart" component={AuthStartScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="AuthLegal" component={AuthLegalScreen} />
        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />
        <Stack.Screen name="OnboardingStart" component={OnboardingStartScreen} />
        <Stack.Screen name="OnboardingSelfie" component={OnboardingSelfieScreen} />
        <Stack.Screen name="OnboardingManualCreateCharacter" component={OnboardingManualCreateCharacterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}