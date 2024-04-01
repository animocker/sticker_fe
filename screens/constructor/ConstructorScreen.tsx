import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView, Text } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import {ConstructorAppearanceTab} from "../../components/constructor/ConstructorAppearanceTab";
import {ConstructorClothTab} from "../../components/constructor/ConstructorClothTab";

export const ConstructorScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "appearance", title: "Appearance" },
    { key: "cloth", title: "Cloth" },
  ]);

  const renderScene = SceneMap({
    appearance: ConstructorAppearanceTab,
    cloth: ConstructorClothTab,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      swipeEnabled={false}
    />
  );
};