import { findByTypeAndIndexNumber} from "./elements";
import {findByTypeAndElement, findByTypeAndElements} from "./animations";
import {Animation} from "@lottiefiles/lottie-js";
import {allElements, AnimationType, ElementType} from "../types/enum";
import {ElementEntity} from "../types/table.types";
import {resolve} from "react-native-svg/lib/typescript/lib/resolve";
import {ChangeColorCommand, ChangeElementCommand, ChangeSizeCommand} from "./command-queue/Command";

class State {
    readonly elements  = new Map<ElementType, number>();
    readonly elementSize  = new Map<ElementType, number>();

    equals(other: State): boolean {
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
      console.log("init");
      this.init();
    }

    private init(){
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
    changeSize(request: ChangeSizeCommand){      //TODO animation changes when size changed, need to fix it
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
      if (this.lastState.equals(this.state)) {
        return this.animation;
      }
      console.log("Requesting animation: " + animationType);
      console.log(this.elements.values());
      const animationPromises =  Array.from(this.elements.values())
        .map(element => element.then(it => findByTypeAndElements(animationType, it)));
      const elementsArray = await Promise.all(animationPromises);
      const flat = elementsArray.flat();
      const lottieJson = this.transformToLottie(flat);
      this.animation = new Animation().fromJSON(lottieJson);
      console.log("Lottie json: " + JSON.stringify(lottieJson));
      console.log("Animation: " + this.animation.layers);
      return this.animation;
    }
}

const instance = Object.freeze(new Avatar());

export default instance;
