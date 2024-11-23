import { sync } from "./watermelon-db/watermelon";
import AvatarService from "./avatar/AvatarService";

export default async function initialize() {
  await sync();
  await AvatarService.init();
  console.log("Initialization completed");
}
