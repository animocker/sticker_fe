import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import Background from "../../components/for_screens/Background";
import Logo from "../../components/for_screens/Logo";
import Button from "../../components/buttons/Button";

export default function Legal() {
  return (
    <Background>
      <Logo />
      <View style={styles.legalBox}>
        <Text style={styles.title}>Юридическая информация</Text>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem omnis repellendus, est magni asperiores earum officiis placeat
            tempora quisquam minima incidunt labore ex explicabo ad. Minus tempora animi porro nulla? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Suscipit porro esse incidunt ullam culpa? Recusandae est fugiat ipsam eaque doloremque quia aliquid sunt quaerat labore,
            tenetur eveniet aspernatur tempore! Incidunt? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis ducimus nostrum provident
            officiis laborum dolor quos accusantium fugit. Officiis reprehenderit inventore porro omnis obcaecati assumenda fuga facilis adipisci nemo
            veritatis. Atque veritatis voluptates nesciunt reiciendis nostrum illo nulla quisquam, commodi quae. Delectus numquam facere amet
            voluptates rerum corrupti excepturi pariatur quas ullam voluptatem eius dolore quo atque repudiandae, commodi in! Eaque illo pariatur
            illum aperiam commodi quisquam corporis aliquam, id velit autem voluptatem libero ad dignissimos. Atque, aperiam ex, accusamus nesciunt
            cumque dolores in, dicta sit ipsam soluta est facere. Minima modi, quasi obcaecati debitis, quia exercitationem autem assumenda eaque
            cupiditate repellendus quod adipisci. Temporibus maiores ut esse ipsam amet odio maxime suscipit sed animi, libero soluta commodi, quidem
            doloremque. Nihil consequuntur nemo quo itaque. Libero repudiandae eius fugit autem blanditiis! Vel ipsam debitis, alias doloremque nobis
            odio, hic fugit omnis blanditiis necessitatibus fuga consequuntur sequi aliquam tenetur? Aliquam, itaque? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Necessitatibus dolore repellat quaerat corporis non a illo porro in nihil! In soluta aliquam incidunt
            corrupti fugit molestias necessitatibus quis, atque sapiente.
          </Text>
        </ScrollView>
        <View style={styles.buttonBox}>
          <Button text="Принять" onPress={() => router.replace("auth/signup/signup")} />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  legalBox: {
    gap: 12,
    padding: 24,
    paddingTop: 32,
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 28.8,
    fontWeight: "700",
    color: "#121212",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19.2,
    textAlign: "left",
    color: "#12121299",
    marginBottom: 400,
  },
  buttonBox: {
    top: "70%",
    position: "absolute",
    zIndex: 2,
  },
});
