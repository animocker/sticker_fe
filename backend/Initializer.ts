import AvatarService from "./avatar/AvatarService";
import { moveAssetsDatabase, open } from "@op-engineering/op-sqlite";

export default async function initialize() {
  await AvatarService.init();
  await openAssetsDb();
  console.log("Initialization completed");
}

const openAssetsDb = async () => {
  const moved = await moveAssetsDatabase({ filename: "lottie.db" });
  if (!moved) {
    throw new Error("Could not move assets database");
  }
  const db = open({ name: "lottie.db" });
  const users = db.execute("SELECT * FROM layers");
  console.log("asdsa" + users);
};
