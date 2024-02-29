import * as SQLite from 'expo-sqlite/next';
import {Asset} from "expo-asset";
import * as FileSystem from "expo-file-system";

export const dbName = "lottie2.db"

export const db = SQLite.openDatabaseSync(dbName);
