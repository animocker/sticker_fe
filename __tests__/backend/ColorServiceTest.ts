import { allElementsTypes, ElementType } from "../../model/enum";
import ColorService from "../../backend/ColorService";

it("Check colors for all element types", async () => {
  for (const elementType of allElementsTypes) {
    const colors = await ColorService.getColorsForElement(elementType, 1);
    if (expectedElementTypesWithColors.includes(elementType)) {
      expect(colors.length).toBeGreaterThan(0);
      colors.forEach((colorSet) => {
        expect(colorSet.colors.length).toBeGreaterThan(0);
      });
    } else {
      expect(colors.length).toBe(0);
    }
  }
});

const expectedElementTypesWithColors: ElementType[] = [ElementType.HEAD, ElementType.HAIR, ElementType.EYES, ElementType.CLOTHES, ElementType.HAT];
