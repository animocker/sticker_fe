import {sync} from "../backend/watermelon-db/watermelon";
import {findAnimation} from "../backend/db/AvatarDao";
import {AnimationType} from "../backend/db/enum";

it("should load watermelon db successfully", async () => {
  await sync();
});

it("Find animation successful", async () => {
  await sync();
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

