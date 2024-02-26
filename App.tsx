import {StyleSheet, Text, View} from 'react-native';
import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AvatarService from "./service/AvatarService";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
    const dbName = "lottie.db"
    const dbAsset = require("./assets/" + dbName)
    const dbUri = Asset.fromModule(dbAsset).uri
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`

    const fileInfo = await FileSystem.getInfoAsync(dbFilePath)
    if (!fileInfo.exists) {

        await FileSystem.makeDirectoryAsync(
            `${FileSystem.documentDirectory}SQLite`,
            {intermediates: true}
        );
        await FileSystem.downloadAsync(dbUri, dbFilePath);
    }
}


export default function App() {
    AvatarService.changeElement({elementType: "HAT", number: 1})
    var lottie = AvatarService.getAnimation("HELLO")
    var jsonLottie = JSON.stringify(lottie);
    return (
        <View style={styles.container}>
            <Text>{jsonLottie}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
