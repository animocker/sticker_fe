import { createRandomState } from "../test-helper-methods";
import AvatarService from "../../backend/avatar/AvatarService";

//13-14 sec
it("Performance check", async () => {
  const start = new Date().getTime();
  for (let i = 0; i < 1000; i++) {
    const randomState = await createRandomState();
    AvatarService.loadState(randomState);
    await AvatarService.getAvatar();
  }
  const end = new Date().getTime();
  console.log(`1000 iterations took ${end - start} ms`);
});
