import AvatarService from "../backend/avatar/AvatarService";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../model/ChangeStateCommand";
import { ElementType } from "../model/enum";
import ConfigService from "../backend/ConfigService";
import { Animation } from "@lottiefiles/lottie-js";
import initialize from "../backend/Initializer";

beforeAll(async () => {
  await initialize();
}, 10000);

async function verifyUndoAndRedo(step1Result: Animation, step0Result: Animation) {
  expect(isAnimationsEquals(step1Result, step0Result)).toBeFalsy();

  AvatarService.undo();
  const undoResult = await AvatarService.getAvatar();
  expect(isAnimationsEquals(undoResult, step0Result)).toBeTruthy();

  AvatarService.redo();
  const redoResult = await AvatarService.getAvatar();
  expect(isAnimationsEquals(redoResult, step1Result)).toBeTruthy();
}

it("Avatar backend could undo and redo change element command", async () => {
  const step0Result = await AvatarService.getAvatar();
  expect(step0Result).not.toBeUndefined();

  AvatarService.changeElement(new ChangeElementCommand(ElementType.HEAD, 2));
  const step1Result = await AvatarService.getAvatar();
  await verifyUndoAndRedo(step1Result, step0Result);
});

it("Avatar backend could undo and redo change size command", async () => {
  const step0Result = await AvatarService.getAvatar();
  expect(step0Result).not.toBeUndefined();

  AvatarService.changeSize(new ChangeSizeCommand(ElementType.HEAD, 10));
  const step1Result = await AvatarService.getAvatar();
  await verifyUndoAndRedo(step1Result, step0Result);
});

it("Avatar backend could undo and redo change color command", async () => {
  const step0Result = await AvatarService.getAvatar();
  expect(step0Result).not.toBeUndefined();

  const headConfig = await ConfigService.getElementTypeConfig(ElementType.HEAD);
  const newSet = headConfig.colorSets[2];
  AvatarService.changeColor(new ChangeColorCommand(ElementType.HEAD, newSet.id));
  const step1Result = await AvatarService.getAvatar();
  await verifyUndoAndRedo(step1Result, step0Result);
});

it("Avatar backend could undo and redo all commands", async () => {
  const step0Result = await AvatarService.getAvatar();
  expect(step0Result).not.toBeUndefined();

  AvatarService.changeElement(new ChangeElementCommand(ElementType.HEAD, 2));
  const step1Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step0Result, step1Result)).toBeFalsy();
  AvatarService.changeSize(new ChangeSizeCommand(ElementType.HEAD, 10));
  const step2Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step1Result, step2Result)).toBeFalsy();
  const headConfig = await ConfigService.getElementTypeConfig(ElementType.HEAD);
  const newSet = headConfig.colorSets[2];
  AvatarService.changeColor(new ChangeColorCommand(ElementType.HEAD, newSet.id));
  const step3Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step2Result, step3Result)).toBeFalsy();

  AvatarService.undo();
  const undo1Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step2Result, undo1Result)).toBeTruthy();
  AvatarService.undo();
  const undo2Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step1Result, undo2Result)).toBeTruthy();
  AvatarService.undo();
  const undo3Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step0Result, undo3Result)).toBeTruthy();

  AvatarService.redo();
  const redo1Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step1Result, redo1Result)).toBeTruthy();
  AvatarService.redo();
  const redo2Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step2Result, redo2Result)).toBeTruthy();
  AvatarService.redo();
  const redo3Result = await AvatarService.getAvatar();
  expect(isAnimationsEquals(step3Result, redo3Result)).toBeTruthy();
});

function isAnimationsEquals(a: Animation, b: Animation) {
  a.name = "";
  b.name = "";
  return JSON.stringify(a) === JSON.stringify(b);
}

afterEach(async () => {
  //reset avatar state
  await AvatarService.init();
});
