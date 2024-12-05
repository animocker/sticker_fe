jest.mock("@react-native-async-storage/async-storage", () => require("@react-native-async-storage/async-storage/jest/async-storage-mock"));
jest.mock("@nozbe/watermelondb/adapters/sqlite/makeDispatcher/index.native.js", () => {
  return jest.requireActual("@nozbe/watermelondb/adapters/sqlite/makeDispatcher/index.js");
});
global.window = global;
