import { sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";
import ElementsService from "./ElementsService";
import AsyncLock from "async-lock";

let isInitialized = false;

export default async function initialize() {
  if (!isInitialized) {
    isInitialized = true;
    await sync();
    await AvatarService.init();
    await ElementsService.init();
    console.log("Initialization completed");
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
}
