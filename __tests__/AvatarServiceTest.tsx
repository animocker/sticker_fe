import AvatarService from "../service/AvatarService";
import {allElements, AnimationType} from "../types/enum";
import {Animation} from "@lottiefiles/lottie-js";

const elements = require("../service/elements");
const animation = require("../service/animations");

it("Avatar service could create basic avatar", async () =>
{
  const result = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(result).not.toBeUndefined();
  const layerNames = extractLayerNames(result);
  allElements
    .map(it => it.toLowerCase())
    .forEach(elementType => {
      expect(layerNames).toContain(`${elementType}_1`);
    });
});

it("Avatar service could change elements", async () =>
{
  const originalResult = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(originalResult).not.toBeUndefined();
  const originalLayerNames = extractLayerNames(originalResult);
  expect(originalLayerNames).not.toContain("head_2");

  AvatarService.changeElement({elementType: "HEAD", number: 2});
  const changedResult = await AvatarService.getAnimation(AnimationType.IDLE);
  const changedLayerNames = extractLayerNames(changedResult);
  expect(changedLayerNames).toContain("head_2");
});

it("New animation layer requested only for changed element", async () =>
{
  const originalResult = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(originalResult).not.toBeUndefined();

  const spy = jest.spyOn(animation, "findAnimationByTypeAndElements");

  AvatarService.changeElement({elementType: "HEAD", number: 2});
  const result = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(result).not.toBeUndefined();
  const layerNames = extractLayerNames(result);
  allElements
    .filter(it => it !== "HEAD")
    .map(it => it.toLowerCase())
    .forEach(elementType => {
      expect(layerNames).toContain(`${elementType}_1`);
    });
  expect(layerNames).toContain("head_2");
  expect(layerNames).not.toContain("head_1");
  expect(spy).toBeCalledTimes(1);
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
  //reset avatar state
  allElements.forEach(element => AvatarService.changeElement({elementType: element, number: 1}));
});


function extractLayerNames(result: Animation) {
  return result.layers
    .map(layer => layer.name.split(";")[0])//remove comment
    .map(name => name.replace("_m", "").replace("_f", ""));  //remove gender
}
