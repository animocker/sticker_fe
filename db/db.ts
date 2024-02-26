import * as SQLite from 'expo-sqlite/next';

const db = SQLite.openDatabaseSync('lottie.db');
export default db;
