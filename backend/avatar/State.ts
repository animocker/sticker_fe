import { ElementType } from "../../model/enum";
import * as serialijse from "serialijse";

export class State {
  readonly id: string;
  readonly elements = new Map<ElementType, number>();
  readonly elementSize = new Map<ElementType, number>(); // change percent size as value
  readonly elementColorSet = new Map<string, string>(); //ElementTypeAndNumber.toString as key, colorSet.id as value

  constructor(id: string = null) {
    this.id = id;
  }

  equals(other: State): boolean {
    if (other === undefined) {
      return false;
    }
    let result = true;
    for (const field in this) {
      const thisField = this[field];
      if (!(thisField instanceof Map)) {
        continue;
      }
      result &&= this.propertyEqual(thisField, other[field]);
    }
    return result;
  }

  serialize(): string {
    return serialijse.serialize(this);
  }

  static deserialize(serialized: string): State {
    return serialijse.deserialize(serialized);
  }

  private propertyEqual(field1: Map<any, any>, field2: Map<any, any>): boolean {
    for (const key of field1.keys()) {
      if (field1.get(key) !== field2.get(key)) {
        return false;
      }
    }
    return true;
  }

  copy(): State {
    const newState = new State();
    for (const field in this) {
      const thisField = this[field];
      if (!(thisField instanceof Map)) {
        continue;
      }
      this.copyProperty(thisField, newState[field]);
    }
    return newState;
  }

  private copyProperty(source: Map<any, any>, target: Map<any, any>) {
    source.forEach((value, key) => {
      target.set(key, value);
    });
  }

  getDifference(other: State): State {
    if (other === undefined) {
      return this;
    }
    const newState = new State();
    for (const field in this) {
      const thisField = this[field];
      if (!(thisField instanceof Map)) {
        continue;
      }
      this.getPropertyDifference(thisField, other[field], newState[field]);
    }
    return newState;
  }

  private getPropertyDifference(thisProperty: Map<any, any>, otherProperty: Map<any, any>, differenceProperty: Map<any, any>) {
    thisProperty.forEach((value, key) => {
      if (value !== otherProperty.get(key)) {
        differenceProperty.set(key, value);
      }
    });
  }
}
