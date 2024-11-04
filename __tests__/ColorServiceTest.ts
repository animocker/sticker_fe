import { sync } from "../backend/watermelon-db/watermelon";
import { allElementsTypes, ElementType } from "../model/enum";
import _ from "lodash";
import { supabase } from "../backend/supabase";
import initialize from "../backend/Initializer";
import ColorService from "../backend/ColorService";

beforeAll(async () => {
  await supabase.auth.signInWithPassword({ email: process.env.TEST_LOGIN, password: process.env.TEST_PASSWORD });
  await initialize();
}, 10000);

it("Check colors for all element types", async () => {
  allElementsTypes.forEach(async (elementType) => {
    const colors = await ColorService.getColorsForElement(elementType, 1);
    if (expectedElementTypesWithColors.includes(elementType)) {
      expect(colors.length).toBeGreaterThan(0);
      colors.forEach((colorSet) => {
        expect(colorSet.colors.length).toBeGreaterThan(0);
      });
    } else {
      expect(colors.length).toBe(0);
    }
  });
});

const expectedElementTypesWithColors: ElementType[] = [ElementType.HEAD, ElementType.HAIR, ElementType.EYES, ElementType.CLOTHES, ElementType.HAT];
