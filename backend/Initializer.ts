import { sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";
import { MMKV } from "react-native-mmkv";

export default async function initialize() {
  await sync();
  await AvatarService.init();
  console.log("Initialization completed");
}
