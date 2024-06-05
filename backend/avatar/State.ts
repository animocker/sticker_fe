import { ElementType } from "../../model/enum";

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
    const obj = {};
    for (const key in this) {
      if (this[key] instanceof Map) {
        obj[key] = Array.from(this[key].entries());
      } else {
        obj[key] = this[key];
      }
    }
    return JSON.stringify(obj);
  }

  static deserialize(serialized: string): State {
    const obj = JSON.parse(serialized);
    const state = new State(obj.id);
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        state[key] = new Map(obj[key]);
      } else {
        state[key] = obj[key];
      }
    }
    return state;
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
