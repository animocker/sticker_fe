import { sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";
import ConfigService from "./ConfigService";

export default async function initialize() {
  await sync();
  await ConfigService.getElementTypeConfigs();
  await AvatarService.init();
  console.log("Watermelon synchronized");
}
