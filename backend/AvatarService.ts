import {findElementByTypeAndIndexNumber} from "./db/elements";
import {allElements, AnimationType, ElementType} from "./db/enum";
import {ChangeColorCommand, ChangeSizeCommand} from "./command-queue/Command";
import {findAnimationByTypeAndElements} from "./db/animations";
import {findAnimation} from "./db/AvatarDao";
import {Animation} from "@lottiefiles/lottie-js";

class State {
  readonly elements  = new Map<ElementType, number>();
  readonly elementSize  = new Map<ElementType, number>();

  equals(other: State): boolean {
    if (other === undefined) {
      return false;
    }
    for(const key of this.elements.keys()){
      if (this.elements.get(key) !== other.elements.get(key)) {
        return false;
      }
    }
    for (const key of other.elementSize.keys()) {
      if (this.elementSize.get(key) !== other.elementSize.get(key)) {
        return false;
      }
    }
    return true;
  }

  copy(): State {
    const newState = new State();
    this.elements.forEach((value, key) => {
      newState.elements.set(key, value);
    });
    this.elementSize.forEach((value, key) => {
      newState.elementSize.set(key, value);
    });
    return newState;
  }

  getDifference(other: State): State {
    if (other === undefined) {
      return this;
    }
    const newState = new State();
    this.elements.forEach((value, key) => {
      if (value !== other.elements.get(key)) {
        newState.elements.set(key, value);
      }
    });
    this.elementSize.forEach((value, key) => {
      if (value !== other.elementSize.get(key)) {
        newState.elementSize.set(key, value);
      }
    });
    return newState;
  }
}
const BASIC_LOTTIE_BODY = "{\"v\":\"5.9.0\",\"fr\":30,\"ip\":0,\"op\":90,\"w\":430,\"h\":430,\"nm\":\"avatar\",\"ddd\":0,\"assets\":[],\"layers\":[]}";

class Avatar {
  private readonly state : State = new State();
  private lastState : State;
  private readonly layersIndexes = new Map<ElementType, number[]>();
  private animation: Animation;
  private layers: Record<string, any>;


  constructor() {
    allElements.map(elementType => {
      this.state.elementSize[elementType] = 0;
      return this.changeElement({elementType, number: 1});
    });
  }


  private addLottieBody(layersString: string) {
    const LOTTIE_BODY = "{\"v\":\"5.9.0\",\"fr\":30,\"ip\":0,\"op\":90,\"w\":430,\"h\":430,\"nm\":\"avatar\",\"ddd\":0,\"assets\":[],{layersSpot}}";
    return LOTTIE_BODY.replace("{layersSpot}", `"layers": [${layersString}]`);
  }

  private getEmptyAnimation(): Animation {
    return new Animation().fromJSON(JSON.parse(BASIC_LOTTIE_BODY));
  }

  changeElement(request) {
    this.state.elements.set(request.elementType, request.number);
  }

  //$[layer.ind].ks.s.k=[width,height, ???]
  changeSize(request: ChangeSizeCommand){
    this.state.elementSize.set(request.elementType, request.sizePercent);
  }

  private changeElementsSize() {
    const stateDifference = this.state.getDifference(this.lastState);
    stateDifference.elementSize.forEach((elementSize, elementType) => {
      if (elementSize === 0) {
        return;
      }
      const elementNumber = this.state.elements.get(elementType);
      const searchedLayerName =`${elementType}_${elementNumber}`;
      const layer = this.animation.layers.find(layer => layer.name.toUpperCase().startsWith(searchedLayerName));
      const scale = layer.transform.scale.toJSON();
      const sizeValues = scale.k;
      const newWidth = sizeValues[0] + (sizeValues[0] * this.state.elementSize.get(elementType) / 100);
      const newHeight = sizeValues[1] + (sizeValues[1] * this.state.elementSize.get(elementType) / 100);
      sizeValues[0] = newWidth;
      sizeValues[1] = newHeight;
      scale.k = sizeValues;
      layer.transform.scale = layer.transform.scale.fromJSON(scale);
    });
  }


  changeColor(changeColorCommand: ChangeColorCommand) {
    console.log(changeColorCommand);
  }

  private transformToLottie(jsonArray: string[]): Record<string, any> {
    const start = Date.now();

    // Extract the 'ind' value from the JSON strings using a regular expression
    const parsedArray = jsonArray.map(str => {
      const match = str.match(/"ind":(\d+)/);
      const ind = match ? Number(match[1]) : 0;
      return { str, ind };
    });

    // Sort the array using the extracted 'ind' values
    parsedArray.sort((a, b) => a.ind - b.ind);

    // Join the original strings of the sorted array
    const layers = parsedArray.map(item => item.str).join(",");

    const lottieJson = this.addLottieBody(layers);
    const result = JSON.parse(lottieJson);

    const timeTaken = Date.now() - start;
    console.log("Transform to lottie took: " + timeTaken + "ms");

    return result;
  }

  async getAnimation(animationType: string | AnimationType) {
    const globalStart = Date.now();
    if (this.state.equals(this.lastState)) {
      return this.animation;
    }
    const stateDifference = this.state.getDifference(this.lastState);
    console.log("Requesting animation: " + animationType);
    const elements = Array.from(stateDifference.elements.entries())
      .map(it => ({elementType: it[0], elementNumber: it[1]}));

    let start = Date.now();
    const layers = await findAnimation(animationType, elements, "MALE");
    let timeTaken = Date.now() - start;
    console.log("Request took: " + timeTaken + "ms");
    const isFirstRequest = this.lastState === undefined;
    start = Date.now();
    if (!isFirstRequest) { //if it's not first request, update required layers, otherwise keep all
      const changedTypes = Array.from(stateDifference.elements.keys()).map(it => it.toLowerCase());
      const layersToKeep= this.animation.layers
        .filter(layer => !changedTypes.includes(layer.name.split("_")[0].toLowerCase()))
        .map(layer => layer.toJSON())
        .map(layer => JSON.stringify(layer));
      layers.push(...layersToKeep);
    }
    this.layers = layers.flat();
    const lottieJson = this.transformToLottie(layers.flat());
    const animationStart = Date.now();
    this.animation = new Animation().fromJSON(lottieJson);
    timeTaken = Date.now() - animationStart;
    console.log("Animation creation took: " + timeTaken + "ms");
    this.changeElementsSize();
    this.lastState = this.state.copy();
    timeTaken = Date.now() - start;
    console.log("Transform took: " + timeTaken + "ms");
    console.log("Global took: " + (Date.now() - globalStart) + "ms");
    return this.animation;
  }
}



export default new Avatar();
