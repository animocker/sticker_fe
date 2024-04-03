import { findByTypeAndIndexNumber} from "./elements";
import {findByTypeAndElement} from "./animations";
import {Animation} from "@lottiefiles/lottie-js";
import {allElements, AnimationType, ElementType} from "../types/enum";
import {ElementEntity} from "../types/table.types";

class Avatar {
    private readonly elements  = new Map<ElementType, ElementEntity>();
    private readonly elementSize  = new Map<ElementType, number>();
    private animation: Animation

    constructor() {
      console.log("init");
      Promise.all(allElements.map(async elementType => {
        this.elementSize[elementType] = 0;
        this.elements[elementType] = await findByTypeAndIndexNumber(elementType, 1);
      }));
    }

    private addLottieBody(layersString: string) {
      const LOTTIE_BODY = "{\"v\":\"5.9.6\",\"fr\":30,\"ip\":0,\"op\":90,\"w\":1600,\"h\":1600,\"nm\":\"avatar\",\"ddd\":0,\"assets\":[],{layersSpot}}";
      return LOTTIE_BODY.replace("{layersSpot}", `"layers": [${layersString}]`);
    }


    changeElement(request) {
      this.changeElementWithoutAnimation(request);
      return this.getAnimation(AnimationType.IDLE);
    }

    private changeElementWithoutAnimation(request) {
      findByTypeAndIndexNumber(request.elementType, request.number);
    }

    //$[layer.ind].ks.s.k=[width,height, ???]
    changeSize(request): Animation {      //TODO animation changes when size changed, need to fix it
      this.elementSize[request.elementType] = request.changeSizePercent;
      const elementNumber = this.elements[request.elementType].idx_nbr;
      const searchedLayerName =`${request.elementType}_${elementNumber}`;
      const layer = this.animation.layers.find(layer => layer.name.toUpperCase().startsWith(searchedLayerName));
      const scale = layer.transform.scale.toJSON();
      const sizeValues = scale.k;
      const newWidth = sizeValues[0] + (sizeValues[0] * request.changeSizePercent / 100);
      const newHeight = sizeValues[1] + (sizeValues[1] * request.changeSizePercent / 100);
      sizeValues[0] = newWidth;
      sizeValues[1] = newHeight;
      scale.k = sizeValues;
      layer.transform.scale = layer.transform.scale.fromJSON(scale);
      return this.animation;
    }


    changeColor(request) {
      console.log(request);
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
      const elementsArray = await Promise.all(
        Object.values(this.elements).map(async element => await findByTypeAndElement(animationType, element))
      );
      const flat = elementsArray.flat();
      const lottieJson = this.transformToLottie(flat);
      this.animation = new Animation().fromJSON(lottieJson);
      return this.animation;
    }

}

export default new Avatar();
