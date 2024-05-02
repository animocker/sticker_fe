import {sync} from "../backend/watermelon-db/watermelon";
import {findAnimation, findColors} from "../backend/db/AvatarWatermelonDao";
import {AnimationType, ElementType} from "../model/enum";

beforeAll(async () => {
  await sync();
});

it("Find animation successful", async () => {
  const result = await findAnimation(
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

it("Find colors successful", async () => {
  const result = await findColors(ElementType.HEAD);
  expect(result).toBeDefined();
  expect(result.length).toBeGreaterThan(0);
});
