import { sync } from "../backend/watermelon-db/watermelon";
import { allElementsTypes, ElementType } from "../model/enum";
import ElementConfigService from "../backend/ElementConfigService";
import _ from "lodash";
import { supabase } from "../backend/supabase";
import initialize from "../backend/Initializer";

beforeAll(async () => {
  await supabase.auth.signInWithPassword({ email: process.env.TEST_LOGIN, password: process.env.TEST_PASSWORD });
  await initialize();
}, 10000);

it("Retrieve config for element type", async () => {
  const elementTypeConfig = await ElementConfigService.getElementTypeConfigs();
  expect(elementTypeConfig).not.toBeUndefined();
  allElementsTypes.forEach((elementType) => {
    const configForElementType = _.find(elementTypeConfig, ["elementType", elementType]);
    expect(configForElementType).not.toBeUndefined();
    expect(configForElementType.elementType).toBe(elementType);
    configForElementType.colorSets.forEach((colorSet) => {
      expect(colorSet.elementType).toBe(elementType);
    });
    if (expectedElementTypesWithColors.includes(elementType)) {
      expect(configForElementType.colorSets.length).toBeGreaterThan(0);
      configForElementType.colorSets.forEach((colorSet) => {
        expect(colorSet.colors.length).toBeGreaterThan(0);
      });
    } else {
      expect(configForElementType.colorSets.length).toBe(0);
    }
  });
});

const expectedElementTypesWithColors: ElementType[] = [ElementType.HEAD, ElementType.HAIR, ElementType.EYES, ElementType.CLOTHES, ElementType.HAT];
