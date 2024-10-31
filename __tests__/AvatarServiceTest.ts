import AvatarService from "../backend/avatar/AvatarService";
import { allElementsTypes, AnimationType, ElementType } from "../model/enum";
import { Animation } from "@lottiefiles/lottie-js";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../model/ChangeStateCommand";
import ConfigService from "../backend/ConfigService";
import initialize from "../backend/Initializer";
import { supabase } from "../backend/supabase";
import "dotenv/config";

beforeAll(async () => {
  await supabase.auth.signInWithPassword({ email: process.env.TEST_LOGIN, password: process.env.TEST_PASSWORD });
  await initialize();
}, 10000);

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

  AvatarService.changeElement(new ChangeElementCommand(ElementType.HEAD, 2));
  const changedResult = await AvatarService.getAvatar();
  const changedLayerNames = extractLayerNames(changedResult);
  expect(changedLayerNames).toContain("head_2");
});

afterEach(async () => {
  //reset avatar state
  await AvatarService.init();
});

it("Avatar backend could change elements color", async () => {
  const originalResult = await AvatarService.getAvatar();
  expect(originalResult).not.toBeUndefined();
  const originalColors = originalResult.colors;

  const headConfig = await ConfigService.getElementTypeConfig(ElementType.HEAD);
  const newSet = headConfig.colorSets[2];
  AvatarService.changeColor(new ChangeColorCommand(ElementType.HEAD, newSet.id));

  const result = await AvatarService.getAvatar();
  expect(result).not.toBeUndefined();
  expect(result.colors).not.toEqual(originalColors);
});

it("Avatar backend could change elements size", async () => {
  const originalResult = await AvatarService.getAvatar();
  expect(originalResult).not.toBeUndefined();
  const originalHeadLayer = getLayer(originalResult, ElementType.HEAD);
  const originalScale = JSON.stringify(originalHeadLayer.transform.scale);

  AvatarService.changeSize(new ChangeSizeCommand(ElementType.HEAD, 10));

  const result = await AvatarService.getAvatar();
  expect(result).not.toBeUndefined();
  const resultHeadLayer = getLayer(result, ElementType.HEAD);
  const resultScale = JSON.stringify(resultHeadLayer.transform.scale);
  expect(resultScale).not.toEqual(originalScale);
});

function extractLayerNames(result: Animation) {
  return result.layers
    .map((layer) => layer.name.split(";")[0]) //remove comment
    .map((name) => name.replace("_m", "").replace("_f", "")); //remove gender
}

function getLayer(animation: Animation, elementType: ElementType) {
  return animation.layers.find((layer) => layer.name.includes(elementType.toLowerCase()));
}
