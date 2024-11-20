// import { StyleSheet, Text, View } from "react-native";
// import * as FileSystem from "expo-file-system";
// import { Asset } from "expo-asset";
// import React, { useEffect, useState } from "react";
// import AvatarService from "./backend/avatar/AvatarService";
// import { AnimationType, ElementType } from "./model/enum";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import AuthStartScreen from "./screens/auth/AuthStartScreen";
// import AuthLegalScreen from "./screens/auth/AuthLegalScreen";
// import AuthLoginScreen from "./screens/auth/AuthLoginScreen";
// import OnboardingStartScreen from "./screens/onboarding/OnboardingStartScreen";
// import OnboardingSelfieScreen from "./screens/onboarding/OnboardingSelfieScreen";
// import OnboardingManualCreateCharacterScreen from "./screens/onboarding/OnboardingManualCreateCharacterScreen";
// import MainScreen from "./screens/main/MainScreen";
// import { ConstructorScreen } from "./screens/constructor/ConstructorScreen";
// import { sync } from "./backend/watermelon-db/watermelon";
// import initialize from "./backend/Initializer";
// import { supabase } from "./backend/supabase";
// import { Session } from "@supabase/supabase-js";
// import Auth from "./components/Auth";
// import { StartScreen } from "./screens/start/StartScreen";

// const Stack = createStackNavigator();

// export default function App() {
//   const [isInitialized, setInit] = useState(false);
//   useEffect(() => {
//     if (!isInitialized) {
//       initialize().then(() => setInit(true));
//     }
//   });
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     supabase.auth.signInWithPassword({ email: "test@animocker.org", password: "test" });

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     console.log("Session: ", session);
//   }, []);

//   if (!isInitialized) {
//     return <Text>Loading...</Text>;
//   }

//   if (!session) {
//     return <Text>Sorry, not session</Text>;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="ConstructorScreen">
//         <Stack.Screen name="AuthStart" component={AuthStartScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="AuthLegal" component={AuthLegalScreen} />
//         <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />

//         <Stack.Screen name="StartScreen" component={StartScreen} />

//         <Stack.Screen name="OnboardingStart" component={OnboardingStartScreen} />
//         <Stack.Screen name="OnboardingSelfie" component={OnboardingSelfieScreen} />
//         <Stack.Screen name="OnboardingManualCreateCharacter" component={OnboardingManualCreateCharacterScreen} />
//         <Stack.Screen name="MainScreen" component={MainScreen} />
//         <Stack.Screen name="ConstructorScreen" component={ConstructorScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
