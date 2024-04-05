import {StyleSheet,} from "react-native";
import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";
import React, {useEffect} from "react";
import AvatarService from "./service/AvatarService";
import {AnimationType, ElementType} from "./types/enum";

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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
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
