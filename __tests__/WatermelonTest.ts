import {sync} from "../backend/watermelon-db/watermelon";
import {
  getAnimationLayers,
  getAllColors,
  getAllColorSets,
} from "../backend/db/AvatarWatermelonDao";
import {AnimationType, ElementType} from "../model/enum";

beforeAll(async () => {
  await sync();
});

it("Find animation successful", async () => {
  const result = await getAnimationLayers(
    AnimationType.IDLE,
    [{elementType: "HEAD", elementNumber: 1}, {elementType: "HAIR", elementNumber:1}, {elementType: "CLOTHES", elementNumber:1}],
    "MALE"
  );
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  result.forEach(it => {
    expect(typeof(it)).toBe("string");
    expect(it).not.toBe("");
  });
});



it("All color sets has at least one color", async () => {
  const result = await getAllColorSets();
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  for (const colorSet of result) {
    expect(colorSet).toBeDefined();
    expect(colorSet.elementType).toBeDefined();
    const colors = await colorSet.colors.fetch();
    expect(colors).toBeDefined();
    expect(colors.length).toBeGreaterThan(0);
  }
});

it("All colors has at least one color set", async () => {
  const result = await getAllColors();
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
  for (const color of result) {
    expect(color).toBeDefined();
    const sets = await color.color_sets.fetch();
    expect(sets).toBeDefined();
    expect(sets.length).toBeGreaterThan(0);
  }
});
