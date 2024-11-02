import { ElementType } from "./enum";

export class ElementTypeAndNumber {
  readonly elementType: ElementType | string;
  readonly elementNumber?: number;

  constructor(elementType: ElementType | string, elementNumber: number = null) {
    this.elementType = elementType;
    this.elementNumber = elementNumber;
  }

  toString() {
    return this.elementNumber === null ? this.elementType : `${this.elementType}_${this.elementNumber}`;
  }
}
