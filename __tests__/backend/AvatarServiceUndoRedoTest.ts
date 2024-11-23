import AvatarService from "../../backend/avatar/AvatarService";
import { ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand } from "../../model/ChangeStateCommand";
import { ElementType } from "../../model/enum";
import { isAnimationsEquals } from "../test-helper-methods";
import ColorService from "../../backend/ColorService";
import { AnimationObject } from "lottie-react-native";

async function verifyUndoAndRedo(step1Result: AnimationObject, step0Result: AnimationObject) {
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

  const currentHeadNumber = await AvatarService.getState().then((it) => it.elements.get(ElementType.HEAD));
  const colorSets = await ColorService.getColorsForElement(ElementType.HEAD, currentHeadNumber);
  const newSet = colorSets[2];
  AvatarService.changeColor(new ChangeColorCommand(ElementType.HEAD, currentHeadNumber, newSet.id));
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
  const currentHeadNumber = await AvatarService.getState().then((it) => it.elements.get(ElementType.HEAD));
  const colorSets = await ColorService.getColorsForElement(ElementType.HEAD, currentHeadNumber);
  const newSet = colorSets[2];
  AvatarService.changeColor(new ChangeColorCommand(ElementType.HEAD, currentHeadNumber, newSet.id));
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

afterEach(async () => {
  //reset avatar state
  await AvatarService.init();
});
