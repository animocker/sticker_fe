import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { allElementsTypes, ElementType } from "../../model/enum";

import { styleAssets } from "../../styleAssets";
import { SvgXml } from "react-native-svg";
import { LottieWrapper } from "../../components/LottieWrapper";
import { ConstructorElements } from "../../components/constructor/ConstructorElements";
import { ICONS_APPEARANCE } from "../../components/constructor/icons/icons_element_menu";

const FAR_TABS = new Set([ElementType.CLOTHES, ElementType.HAT, ElementType.HAIR]);

export const ConstructorAvatar = () => {
  const buttonTitles = allElementsTypes;
  const [selectedTab, setSelectedTab] = useState(allElementsTypes[0]);

  const tabs2 = new Map<ElementType, React.FC>();
  {
    allElementsTypes.forEach((type) => {
      tabs2.set(type, () => <ConstructorElements elementType={type} />);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.lottieFar}>
        <LottieWrapper />
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.elementsContainer}>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttonTitles.map((title, index) => (
                <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity style={[styles.button, selectedTab === title && styles.selectedButton]} onPress={() => setSelectedTab(title)}>
                    {<SvgXml xml={ICONS_APPEARANCE[title]} />}
                    <Text>{title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            {tabs2.get(selectedTab) ? React.createElement(tabs2.get(selectedTab)) : null}
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
    margin: 5,
    paddingBottom: 5,
    paddingTop: 5,
    padding: 10,
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
  lottieClose: {
    alignSelf: "center",
    height: 300,
    transform: [{ scale: 2 }, { translateY: 40 }],
    width: Dimensions.get("window").width * 0.7,
  },
  lottieFar: {
    alignSelf: "center",
    height: 300,
    width: Dimensions.get("window").width * 0.7,
  },
  menuContainer: {
    flexGrow: 1,
  },
  selectedButton: {
    borderColor: styleAssets.colorsPalette.primeBlue,
  },
});
