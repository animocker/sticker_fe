import { ElementType } from "./enum";
import { State } from "../backend/avatar/State";
import { ElementTypeAndNumber } from "./ElementTypeAndNumber";

export type ChangeStateCommand = {
  execute(state: State): void;
  rollback(state: State): void;
};

export class ChangeSizeCommand implements ChangeStateCommand {
  elementType: ElementType;
  sizePercent: number;
  prevValue: number;

  constructor(elementType: ElementType, sizePercent: number) {
    this.elementType = elementType;
    this.sizePercent = sizePercent;
  }

  execute(state: State): void {
    this.prevValue = state.elementSize.get(this.elementType);
    state.elementSize.set(this.elementType, this.sizePercent);
  }

  rollback(state: State): void {
    state.elementSize.set(this.elementType, this.prevValue);
  }
}

export class ChangeColorCommand implements ChangeStateCommand {
  elementType: ElementType;
  elementNumber: number;
  colorSetId: string;
  prevColorSetId: string;

  constructor(elementType: ElementType, elementNumber: number, colorId: string) {
    this.elementType = elementType;
    this.elementNumber = elementNumber;
    this.colorSetId = colorId;
  }

  execute(state: State): void {
    this.prevColorSetId = state.elementColorSet.get(this.elementType);
    state.elementColorSet.set(this.elementType, this.colorSetId);
  }

  rollback(state: State): void {
    state.elementColorSet.set(this.elementType, this.prevColorSetId);
  }
}

export class ChangeElementCommand implements ChangeStateCommand {
  elementType: ElementType;
  number: number;
  prevNumber: number;

  constructor(elementType: ElementType, number: number) {
    this.elementType = elementType;
    this.number = number;
  }

  execute(state: State): void {
    this.prevNumber = state.elementNumber.get(this.elementType);
    state.elementNumber.set(this.elementType, this.number);
  }

  rollback(state: State): void {
    state.elementNumber.set(this.elementType, this.prevNumber);
  }
}
