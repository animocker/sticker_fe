import { sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";
import ElementConfigService from "./ElementConfigService";

export default async function initialize() {
  await sync();
  await ElementConfigService.getElementTypeConfigs();
  await AvatarService.init();
  console.log("Watermelon synchronized");
}
