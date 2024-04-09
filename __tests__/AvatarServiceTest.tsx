import AvatarService from "../service/AvatarService";
import {AnimationType} from "../types/enum";

it("Avatar service could create basic avatar", () =>
{
  AvatarService.getAnimation(AnimationType.IDLE).then(it => it != undefined);
});
