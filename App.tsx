import {StyleSheet, Text,} from "react-native";
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";
import React, {useEffect, useState} from "react";
import AvatarService from "./backend/AvatarService";
import {AnimationType, ElementType} from "./model/enum";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import AuthStartScreen from "./screens/auth/AuthStartScreen";
import AuthLegalScreen from "./screens/auth/AuthLegalScreen";
import AuthLoginScreen from "./screens/auth/AuthLoginScreen";
import OnboardingStartScreen from "./screens/onboarding/OnboardingStartScreen";
import OnboardingSelfieScreen from "./screens/onboarding/OnboardingSelfieScreen";
import OnboardingManualCreateCharacterScreen from "./screens/onboarding/OnboardingManualCreateCharacterScreen";
import MainScreen from "./screens/main/MainScreen";
import {ConstructorScreen} from "./screens/constructor/ConstructorScreen";
import {sync} from "./backend/watermelon-db/watermelon";
import initialize from "./backend/Initializer";

const Stack = createStackNavigator();


export default function App() {
  const [isInitialized, setInit] = useState(false);
  useEffect(() => {initialize().then(() => setInit(true));});
  if (!isInitialized) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ConstructorScreen"
      >
        <Stack.Screen name="AuthStart" component={AuthStartScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="AuthLegal" component={AuthLegalScreen} />
        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />
        <Stack.Screen name="OnboardingStart" component={OnboardingStartScreen} />
        <Stack.Screen name="OnboardingSelfie" component={OnboardingSelfieScreen} />
        <Stack.Screen name="OnboardingManualCreateCharacter" component={OnboardingManualCreateCharacterScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ConstructorScreen" component={ConstructorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
