import {ElementType} from "./enum";
import AvatarService from "../backend/AvatarService";

export interface Command {
    type: CommandType
    isExecuted: boolean;
    execute(): void;
}

export class ChangeSizeCommand implements Command {
    type = CommandType.CHANGE_SIZE;
    elementType: ElementType;
    sizePercent: number;
    isExecuted = false;

    constructor(sizePercent: number) {
      this.sizePercent = sizePercent;
    }

    execute(): void {
      AvatarService.changeSize(this);
      this.isExecuted = true;
    }
}

export class ChangeColorCommand implements Command {
    type = CommandType.CHANGE_COLOR;
    elementType: ElementType;
    color: string;
    isExecuted = false;

    constructor(color: string) {
      this.color = color;
    }

    execute(): void {
      AvatarService.changeColor(this);
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
      AvatarService.changeElement(this);
      this.isExecuted = true;
    }
}

export enum CommandType {
    CHANGE_SIZE,
    CHANGE_COLOR,
    CHANGE_ELEMENT,
}
