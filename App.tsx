import {View, Text, StyleSheet} from 'react-native';
import * as FileSystem from 'expo-file-system'
import {Asset} from "expo-asset"
import React, {useEffect, useState} from "react";
import {SQLiteProvider, useSQLiteContext} from "expo-sqlite/next";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Element} from "./db/model";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
    const dbName = "lottie.db"
    const dbAsset = require("./assets/" + dbName)
    const dbUri = Asset.fromModule(dbAsset).uri
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`

    console.log(dbFilePath)
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath)
    // if (!fileInfo.exists) {

    await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        {intermediates: true}
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
    // }
}


export default function App() {
    loadDatabase().then(() => console.log("Database loaded")).catch((e) => console.error(e))
    return (
        <View style={styles.container}>
            <SQLiteProvider databaseName="lottie.db">
                <Header/>
                <Content elementType="HAT" number={1}/>
            </SQLiteProvider>
        </View>
    );
}

export function Header() {
    const db = useSQLiteContext();
    const [version, setVersion] = useState('');
    useEffect(() => {
        async function setup() {
            const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
                'SELECT sqlite_version()'
            );
            setVersion(result['sqlite_version()']);
        }

        setup();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.container}>SQLite version: {version}</Text>
        </View>
    );
}

export function Content(elementType: string, number: number) {
    const db = useSQLiteContext();
    const [element, setElement] = useState<Element>();

    useEffect(() => {
        async function setup() {
            console.log("Element type - " + elementType)
            console.log("Element number - " + number)
            const result = db.getFirstSync<Element>(
                `SELECT * FROM element WHERE type = ? AND idx_nbr = ?`,
                [elementType, number]
            )
            console.log(result)
            setElement(result)
        }

        setup().then(() => console.log("Element loaded")).catch((e) => console.error(e))
    }, []);

    return (
        <View style={styles.container}>
            <Text>{`${element}`}</Text>
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
