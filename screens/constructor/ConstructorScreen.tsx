import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView, Text } from "react-native";
import { TabView, SceneMap, TabBar, TabBarItem } from "react-native-tab-view";
import {ConstructorAppearanceTab} from "../../components/constructor/ConstructorAppearanceTab";
import {ConstructorClothTab} from "../../components/constructor/ConstructorClothTab";
import {styleAssets} from "../../styleAssets";

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

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabs}
      labelStyle={styles.label}
      activeColor={styleAssets.colorsPalette.white}
      pressColor={styleAssets.colorsPalette.primeBlue}
      contentContainerStyle={styles.container}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      swipeEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  indicator: {
    alignSelf: "center",
    backgroundColor: styleAssets.colorsPalette.primeBlue,
    borderBottomColor: styleAssets.colorsPalette.primeBlue,
    borderRadius: 8,
    height: 46,
  },
  label: {
    borderRadius: 8,
    color: styleAssets.colorsPalette.primeBlue,
  },
  tabs: {
    alignSelf: "center",
    backgroundColor: styleAssets.colorsPalette.white,
    // borderColor: styleAssets.colorsPalette.white,
    // borderRadius: 8,
    // borderWidth: 8,
    borderRadius: 8,
    color: styleAssets.colorsPalette.primeBlue,
    marginTop: 10,
    width: "90%",
  }
});