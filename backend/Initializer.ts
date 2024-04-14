import {database, sync} from "./watermelon-db/watermelon";
import AvatarService from "./AvatarService";

export default async function initialize() {
  await sync();
  console.log("Watermelon synchronized");
}
