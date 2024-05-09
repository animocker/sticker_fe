import {sync} from "../backend/watermelon-db/watermelon";
import AvatarService from "../backend/AvatarService";
import {allElements, AnimationType, ElementType} from "../model/enum";
import ConfigService from "../backend/ConfigService";
import _ from "lodash";
import {ElementTypeConfig} from "../model/Config";

beforeAll(async () => {
  await sync();
});

it("Retrieve config for element type", async () =>
{
  const elementTypeConfig = await ConfigService.getElementTypeConfigs();
  expect(elementTypeConfig).not.toBeUndefined();
  allElements.forEach(elementType => {
    const configForElementType = _.find(elementTypeConfig, ["elementType", elementType]);
    expect(configForElementType).not.toBeUndefined();
    expect(configForElementType.elementType).toBe(elementType);
    configForElementType.colorSets.forEach(colorSet => {
      expect(colorSet.elementType).toBe(elementType);
    });
    if (expectedElementTypesWithColors.includes(elementType)) {
      expect(configForElementType.colorSets.length).toBeGreaterThan(0);
      configForElementType.colorSets.forEach(colorSet => {
        expect(colorSet.colors.length).toBeGreaterThan(0);
      });
    } else {
      expect(configForElementType.colorSets.length).toBe(0);
    }
  });
});

const expectedElementTypesWithColors: ElementType[] = [
  ElementType.HEAD,
  ElementType.HAIR,
  ElementType.EYES,
  ElementType.CLOTHES,
  ElementType.HAT
];
