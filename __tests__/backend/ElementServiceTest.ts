import { allElementsTypes, ElementType } from "../../model/enum";
import ElementsService from "../../backend/ElementsService";

it("Check colors for all element types", async () => {
  for (const elementType of allElementsTypes) {
    const colors = ElementsService.getColorsForElement(elementType, 1);
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

it("Check elements for all element types", () => {
  for (const elementType of allElementsTypes) {
    const elements = ElementsService.getElements(elementType);
    expect(elements.length).toBeGreaterThan(0);
  }
});

const expectedElementTypesWithColors: ElementType[] = [ElementType.HEAD, ElementType.HAIR, ElementType.EYES, ElementType.CLOTHES, ElementType.HAT];
