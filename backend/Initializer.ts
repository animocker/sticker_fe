import { database, sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";
import ConfigService from "./ConfigService";
import * as serialijse from "serialijse";
import { State } from "./avatar/State";

export default async function initialize() {
  serialijse.declarePersistable(State);
  await sync();
  await ConfigService.getElementTypeConfigs();
  await AvatarService.init();
  console.log("Watermelon synchronized");
}
