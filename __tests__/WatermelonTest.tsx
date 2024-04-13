import {sync} from "../backend/watermelon-db/watermelon";

it("should load watermelon db successfully", async () => {
  await sync();
});
