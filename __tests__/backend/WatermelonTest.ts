import { database, sync } from "../../backend/watermelon-db/watermelon";
import { getAnimationLayers } from "../../backend/db/AvatarWatermelonDao";
import { AnimationType } from "../../model/enum";
import { ColorWDB, ElementsColorSetsWDB, ElementsWDB } from "../../backend/watermelon-db/read-only/model";
import { getAllColorSets } from "../../backend/db/ColorWatermelonDao";

it("Find animation successful", async () => {
  const result = await getAnimationLayers(AnimationType.IDLE, ["HEAD_1", "HAIR_1", "CLOTHES_1"], "MALE");
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  result.forEach((it) => {
    expect(typeof it).toBe("string");
    expect(it).not.toBe("");
  });
});

it("All color sets has at least one color", async () => {
  const result = await getAllColorSets();
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  for (const colorSet of result) {
    expect(colorSet).toBeDefined();
    expect(colorSet.elements.fetch()).toBeDefined();
    const colors = await colorSet.colors.fetch();
    expect(colors).toBeDefined();
    expect(colors.length).toBeGreaterThan(0);
  }
});

it("All colors has at least one color set", async () => {
  const result = await database.get<ColorWDB>(ColorWDB.table).query().fetch();
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  for (const color of result) {
    expect(color).toBeDefined();
    const sets = await color.color_sets.fetch();
    expect(sets).toBeDefined();
    expect(sets.length).toBeGreaterThan(0);
  }
});

it("Elements can load lazy collections", async () => {
  const result = await database.get<ElementsWDB>(ElementsWDB.table).query().fetch();
  const check = await database.get<ElementsColorSetsWDB>(ElementsColorSetsWDB.table).query().fetch();
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  let isSomeElementHasColorSets = false;
  for (const element of result) {
    expect(element).toBeDefined();
    const colorSets = await element.color_sets.fetch();
    if (colorSets.length > 0) {
      isSomeElementHasColorSets = true;
    }
    const layers = await element.layers.fetch();
    expect(layers).toBeDefined();
    expect(layers.length).toBeGreaterThan(0);
  }
  expect(isSomeElementHasColorSets).toBe(true);
});
