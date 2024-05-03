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
    if (configForElementType.colorConfigs.length === 0) {
      expect(configForElementType.isColorChangeable).toBeFalsy();
    } else {
      expect(configForElementType.isColorChangeable).toBeTruthy();
    }
  });
  const headConfig = _.find(elementTypeConfig, ["elementType", ElementType.HEAD]);
  expect(headConfig.colorConfigs).not.toBeUndefined();
  expect(headConfig.colorConfigs.length).toBeGreaterThan(0);
});
