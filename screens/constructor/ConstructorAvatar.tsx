import React, { useState } from "react";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { constructorElementTypes, ElementType } from "../../model/enum";
import { styleAssets } from "../../styleAssets";
import { SvgXml } from "react-native-svg";
import { ConstructorElements } from "../../components/constructor/ConstructorElements";
import { LottieWrapper } from "../../components/LottieWrapper";
import { ICONS_APPEARANCE } from "../../components/constructor/icons/icons_element_menu";

export const ConstructorAvatar = () => {
  const [selectedTab, setSelectedTab] = useState(constructorElementTypes[0]);
  const background = require("../../assets/background.png");

  const tabs = new Map<ElementType, React.FC>();
  {
    constructorElementTypes.forEach((type) => {
      tabs.set(type, () => <ConstructorElements elementType={type} />);
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.imageContainer}>
        <View style={styles.lottie}>
          <LottieWrapper />
        </View>
      </ImageBackground>
      <View style={styles.menuContainer}>
        <View style={styles.elementsContainer}>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {constructorElementTypes.map((title, index) => (
                <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity style={[styles.button, selectedTab === title && styles.selectedButton]} onPress={() => setSelectedTab(title)}>
                    {<SvgXml xml={ICONS_APPEARANCE[title]} />}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            {tabs.get(selectedTab) ? React.createElement(tabs.get(selectedTab)) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: styleAssets.colorsPalette.white,
    borderColor: styleAssets.colorsPalette.white,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    height: 50,
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    padding: 10,
    width: 50,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  elementsContainer: {
    backgroundColor: styleAssets.colorsPalette.mediumBlue,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "100%",
    padding: 16,
  },
  imageContainer: {
    height: 400,
    paddingTop: 50,
  },
  lottie: {
    alignSelf: "center",
    height: 300,
    transform: [{ scale: 2 }, { translateY: 40 }],
    width: Dimensions.get("window").width * 0.7,
  },
  menuContainer: {
    flexGrow: 1,
  },
  selectedButton: {
    borderColor: styleAssets.colorsPalette.primeBlue,
  },
});
