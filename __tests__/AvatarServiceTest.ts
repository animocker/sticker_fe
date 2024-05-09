import AvatarService from "../backend/AvatarService";
import {allElements, AnimationType, ElementType} from "../model/enum";
import {Animation, LayerType} from "@lottiefiles/lottie-js";
import {sync} from "../backend/watermelon-db/watermelon";
import {ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand} from "../model/Command";
import ConfigService from "../backend/ConfigService";
import {getAllColors} from "../backend/db/AvatarWatermelonDao";
import initialize from "../backend/Initializer";

const avatarDao = require("../backend/db/AvatarWatermelonDao");

beforeAll(async () => {
  await initialize();
});

it("Avatar backend could create basic avatar", async () =>
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

it("Avatar backend could change elements", async () =>
{
  const originalResult = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(originalResult).not.toBeUndefined();
  const originalLayerNames = extractLayerNames(originalResult);
  expect(originalLayerNames).not.toContain("head_2");

  AvatarService.changeElement(new ChangeElementCommand(ElementType.HEAD, 2));
  const changedResult = await AvatarService.getAnimation(AnimationType.IDLE);
  const changedLayerNames = extractLayerNames(changedResult);
  expect(changedLayerNames).toContain("head_2");
});

it("New animation layer requested only for changed element", async () =>
{
  const originalResult = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(originalResult).not.toBeUndefined();

  const spy = jest.spyOn(avatarDao, "findAnimation");

  AvatarService.changeElement(new ChangeElementCommand(ElementType.HEAD, 2));
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
  expect(spy).toBeCalledWith(AnimationType.IDLE, [{elementType: "HEAD", elementNumber: 2}], "MALE");
});

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
  //reset avatar state
  allElements.forEach(element => AvatarService.changeElement({elementType: element, number: 1}));
});


it("Avatar backend could change elements color", async () =>
{
  const originalResult = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(originalResult).not.toBeUndefined();
  const originalColors = originalResult.colors;

  const headConfig = await ConfigService.getElementTypeConfig(ElementType.HEAD);
  const newSet = headConfig.colorSets[2];
  AvatarService.changeColor(new ChangeColorCommand(ElementType.HEAD, newSet.id));

  const result = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(result).not.toBeUndefined();
  expect(result.colors).not.toEqual(originalColors);
});


it("Avatar backend could change elements size", async () =>
{
  const originalResult = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(originalResult).not.toBeUndefined();
  const originalHeadLayer = getLayer(originalResult, ElementType.HEAD);
  const originalScale = JSON.stringify(originalHeadLayer.transform.scale);

  AvatarService.changeSize(new ChangeSizeCommand(ElementType.HEAD, 10));

  const result = await AvatarService.getAnimation(AnimationType.IDLE);
  expect(result).not.toBeUndefined();
  const resultHeadLayer = getLayer(result, ElementType.HEAD);
  const resultScale = JSON.stringify(resultHeadLayer.transform.scale);
  expect(resultScale).not.toEqual(originalScale);
});


function extractLayerNames(result: Animation) {
  return result.layers
    .map(layer => layer.name.split(";")[0])//remove comment
    .map(name => name.replace("_m", "").replace("_f", ""));  //remove gender
}

function getLayer(animation: Animation, elementType: ElementType){
  return animation.layers.find(layer => layer.name.includes(elementType.toLowerCase()));
}
