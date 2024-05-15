import {ElementType} from "./enum";

//TODO WIP

export type Command = {
    type: CommandType
    isExecuted: boolean;
    execute(): void;
}

export class ChangeSizeCommand implements Command {
    type = CommandType.CHANGE_SIZE;
    elementType: ElementType;
    sizePercent: number;
    isExecuted = false;

    constructor(elementType: ElementType, sizePercent: number) {
      this.elementType = elementType;
      this.sizePercent = sizePercent;
    }

    execute(): void {
      this.isExecuted = true;
    }
}

export class ChangeColorCommand implements Command {
    type = CommandType.CHANGE_COLOR;
    elementType: ElementType;
    elementNumber?: number;
    colorSetId: string;
    isExecuted = false;

    constructor(elementType: ElementType,  colorId: string, elementNumber = null) {
      this.elementType = elementType;
      this.elementNumber = elementNumber;
      this.colorSetId = colorId;
    }

    execute(): void {
      this.isExecuted = true;
    }
}

export class ChangeElementCommand implements Command {
    type = CommandType.CHANGE_ELEMENT;
    elementType: ElementType;
    number: number;
    isExecuted = false;

    constructor(elementType: ElementType, number: number) {
      this.elementType = elementType;
      this.number = number;
    }

    execute(): void {
      this.isExecuted = true;
    }
}

export enum CommandType {
    CHANGE_SIZE,
    CHANGE_COLOR,
    CHANGE_ELEMENT,
}
