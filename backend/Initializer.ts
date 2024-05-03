import {database, sync} from "./watermelon-db/watermelon";
import AvatarService from "./AvatarService";
import ConfigService from "./ConfigService";

export default async function initialize() {
  await sync();
  await ConfigService.getElementTypeConfigs();
  console.log("Watermelon synchronized");
}
