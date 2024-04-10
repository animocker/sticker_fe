import {findElementByTypeAndIndexNumber} from "./elements";
import {Animation, Layer, ShapeLayer} from "@lottiefiles/lottie-js";
import {allElements, AnimationType, ElementType} from "../types/enum";
import {ChangeColorCommand, ChangeSizeCommand} from "./command-queue/Command";
import {findAnimationByTypeAndElements} from "./animations";

class State {
    readonly elements  = new Map<ElementType, number>();
    readonly elementSize  = new Map<ElementType, number>();

    equals(other: State): boolean {
      if (other === undefined) {
        return false;
      }
      other.elements.forEach((value, key) => {
        if (this.elements.get(key) !== value) {
          return false;
        }
      });
      other.elementSize.forEach((value, key) => {
        if (this.elementSize.get(key) !== value) {
          return false;
        }
      });
      return true;
    }
}

class Avatar {
    private state : State = new State();
    private lastState : State;
    private animation: Animation;

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


    changeElement(request) {
      this.state.elements.set(request.elementType, request.number);
    }

    //$[layer.ind].ks.s.k=[width,height, ???]
    changeSize(request: ChangeSizeCommand){
      this.state.elementSize.set(request.elementType, request.sizePercent);
    }

    private changeElementsSize() {
      this.state.elementSize.forEach((elementSize, elementType) => {
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
      const layers = jsonArray.sort((a, b) => {
        const aInd = JSON.parse(a)["ind"];
        const bInd = JSON.parse(b)["ind"];
        return aInd - bInd;
      }).join(",");
      const lottieJson = this.addLottieBody(layers);
      return JSON.parse(lottieJson);
    }

    async getAnimation(animationType: string | AnimationType): Promise<Animation> {
      if (this.state.equals(this.lastState)) {
        return this.animation;
      }
      console.log("Requesting animation: " + animationType);
      const promises: Promise<string[]>[] = [];
      for (const [key, value] of this.state.elements) {
        const promise =  findElementByTypeAndIndexNumber(key, value)
          .then(element => findAnimationByTypeAndElements(animationType, element));
        promises.push(promise);
      }
      const layers = (await Promise.all(promises)).flat();
      const lottieJson = this.transformToLottie(layers.flat());
      this.animation = new Animation().fromJSON(lottieJson);
      this.lastState = this.state;
      return this.animation;
    }
}

export default new Avatar();
