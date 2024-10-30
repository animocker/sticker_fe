import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView, Text, ImageBackground } from "react-native";
import { TabView, SceneMap, TabBar, TabBarItem } from "react-native-tab-view";
import { ConstructorAppearanceTab } from "../../components/constructor/ConstructorAppearanceTab";
import { ConstructorClothTab } from "../../components/constructor/ConstructorClothTab";
import { styleAssets } from "../../styleAssets";

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

  const image = require("../../assets/background.png");

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={{ ...styles.tabs }}
      labelStyle={styles.label}
      activeColor={styleAssets.colorsPalette.white}
      pressColor={styleAssets.colorsPalette.white}
      contentContainerStyle={styles.tabsContainer}
    />
  );

  return (
    <ImageBackground source={image} style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        swipeEnabled={false}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  indicator: {
    backgroundColor: styleAssets.colorsPalette.primeBlue,
    borderColor: styleAssets.colorsPalette.white,
    borderRadius: 8,
    borderWidth: 6,
    height: 48,
  },
  label: {
    borderRadius: 8,
    color: styleAssets.colorsPalette.primeBlue,
    fontWeight: "bold",
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
  },
  tabsContainer: {
    borderRadius: 8,
  },
});
