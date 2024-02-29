import {Button, NativeModules, StyleSheet, Text, View} from 'react-native';
import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"
import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AvatarService from "./service/AvatarService";
import {ElementType} from "./db/enum";
import {tables} from "./db/elements";

const Stack = createNativeStackNavigator();


export const loadDatabase = async () => {
    const dbName = "lottie2.db"
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
    useEffect(() => {
            loadDatabase().then(() => console.log("Database loaded")).catch((e) => console.error(e))
        }
    )
    AvatarService.changeElement({elementType: ElementType.HAT, number: 2})
    var lottie = AvatarService.getAnimation("HELLO")
    return (
        <View style={styles.container}>

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
