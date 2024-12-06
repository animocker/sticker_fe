import AvatarService from "../../backend/avatar/AvatarService";
import { allElementsTypes, ElementType } from "../../model/enum";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../model/ChangeStateCommand";
import "dotenv/config";
import { AnimationObject } from "lottie-react-native";
import avatarService from "../../backend/avatar/AvatarService";
import ElementsService from "../../backend/ElementsService";

it("Avatar backend could create basic avatar", async () => {
  const result = await AvatarService.getAvatar();
  expect(result).not.toBeUndefined();
  const layerNames = extractLayerNames(result);
  allElementsTypes
    .map((it) => it.toLowerCase())
    .forEach((elementType) => {
      expect(layerNames).toContain(`${elementType}_1`);
    });
});

it("Avatar backend could change elements", async () => {
  const originalResult = await AvatarService.getAvatar();
  expect(originalResult).not.toBeUndefined();
  const originalLayerNames = extractLayerNames(originalResult);
  expect(originalLayerNames).not.toContain("head_2");

  AvatarService.executeCommand(new ChangeElementCommand(ElementType.HEAD, 2));
  const changedResult = await AvatarService.getAvatar();
  const changedLayerNames = extractLayerNames(changedResult);
  expect(changedLayerNames).toContain("head_2");
});

afterEach(async () => {
  //reset avatar state
  await AvatarService.init();
});

it("Avatar backend could change elements color", async () => {
  const elementType = ElementType.HEAD;
  const originalResult = await avatarService.getAvatar();
  expect(originalResult).not.toBeUndefined();
  const originalColors = getLayer(originalResult, elementType)
    .shapes.flatMap((shape) => shape.it)
    .map((it) => it?.c?.k);

  const avatarState = AvatarService.getState();
  const headNumber = avatarState.elementNumber.get(elementType);
  const colorSets = ElementsService.getColorsForElement(elementType, headNumber);
  const newSet = colorSets[2];
  AvatarService.executeCommand(new ChangeColorCommand(elementType, headNumber, newSet.id));

  const result = await avatarService.getAvatar();
  expect(result).not.toBeUndefined();
  const newColors = getLayer(result, elementType)
    .shapes.flatMap((shape) => shape.it)
    .map((it) => it?.c?.k);
  expect(newColors).not.toEqual(originalColors);
});

it("Avatar backend could change elements size", async () => {
  const elementType = ElementType.HEAD;
  const originalResult = await AvatarService.getAvatar();
  expect(originalResult).not.toBeUndefined();
  const originalHeadLayer = getLayer(originalResult, elementType);
  const originalScale = originalHeadLayer.ks.s.k;

  AvatarService.executeCommand(new ChangeSizeCommand(elementType, 10));

  const result = await AvatarService.getAvatar();
  expect(result).not.toBeUndefined();
  const resultHeadLayer = getLayer(result, elementType);
  const resultScale = resultHeadLayer.ks.s.k;
  expect(resultScale).not.toEqual(originalScale);
});

function extractLayerNames(result: AnimationObject) {
  return result.layers
    .map((layer) => layer.nm.split(";")[0]) //remove comment
    .map((name) => name.replace("_m", "").replace("_f", "")); //remove gender
}

function getLayer(animation: AnimationObject, elementType: ElementType) {
  return animation.layers.find((layer) => layer.nm.includes(elementType.toLowerCase()));
}
