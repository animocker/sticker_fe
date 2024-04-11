import AvatarService from "../service/AvatarService";
import {AnimationType} from "../types/enum";

it("Avatar service could create basic avatar", async () =>
{
  const result = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(result).not.toBeUndefined();
});
