import { sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";
import ElementsService from "./ElementsService";

export default async function initialize() {
  await sync();
  await AvatarService.init();
  await ElementsService.init();
  console.log("Initialization completed");
}
