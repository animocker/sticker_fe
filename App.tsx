import {StyleSheet,} from "react-native";
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";
import React, {useEffect} from "react";
import AvatarService from "./service/AvatarService";
import {AnimationType, ElementType} from "./db/enum";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import AuthStartScreen from "./screens/auth/AuthStartScreen";
import AuthLegalScreen from "./screens/auth/AuthLegalScreen";
import AuthLoginScreen from "./screens/auth/AuthLoginScreen";
import OnboardingStartScreen from "./screens/onboarding/OnboardingStartScreen";
import OnboardingSelfieScreen from "./screens/onboarding/OnboardingSelfieScreen";
import OnboardingManualCreateCharacterScreen from "./screens/onboarding/OnboardingManualCreateCharacterScreen";

const Stack = createStackNavigator();

export const loadDatabase = async () => {
  const dbName = "lottie2.db";
  const dbAsset = require("./assets/" + dbName);
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      {intermediates: true}
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  useEffect(() => {
    loadDatabase().then(() => console.log("Database loaded")).catch((e) => console.error(e));
  }
  );
  AvatarService.changeElement({elementType: ElementType.HAT, number: 2});
  const lottie = AvatarService.getAnimation(AnimationType.IDLE);
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


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
