import {findByTypeAndIndexNumber, findByType} from "../db/elements";
import {findByTypeAndElement} from "../db/animations";
import {Animation} from "@lottiefiles/lottie-js";
import {allElements, AnimationType, ElementType} from "../db/enum";
import {Element} from "../db/elements";

class Avatar {
    private readonly elements: Map<string|ElementType, Element>;

    constructor() {
      console.log("init");
      this.elements = new Map<ElementType, Element>();
      allElements.forEach(elementType => {
        this.changeElement({elementType: elementType, number: 1});
      });
      //log elements
      this.elements.forEach((element, type) => {
        console.log("Type: " + type + " Element: " + element.idx_nbr);
      });
    }

    addLottieBody(layersString: string) {
      const LOTTIE_BODY = "{\"v\":\"5.9.6\",\"fr\":30,\"ip\":0,\"op\":90,\"w\":1600,\"h\":1600,\"nm\":\"avatar\",\"ddd\":0,\"assets\":[],{layersSpot}}";
      return LOTTIE_BODY.replace("{layersSpot}", `"layers": [${layersString}]`);
    }


    changeElement(request) {
      const element = findByTypeAndIndexNumber(request.elementType, request.number);
      if (element != null) {
        this.elements[request.elementType] = element;
      }
    }

    changeSize(request) {
      console.log(request);
    }

    changeColor(request) {
      console.log(request);
    }

    transformToLottie(jsonArray: string[]): Record<string, any> {
      const layers = jsonArray.sort((a, b) => {
        const aInd = JSON.parse(a)["ind"];
        const bInd = JSON.parse(b)["ind"];
        return aInd - bInd;
      }).join(",");
      const lottieJson = this.addLottieBody(layers);
      return JSON.parse(lottieJson);
    }

    getAnimation(animationType: string | AnimationType): Animation {
      const elementsArray = Object.values(this.elements)
        .map(element => findByTypeAndElement(animationType, element))
        .flatMap(animation => JSON.parse("[" + animation.value_array + "]"))
        .map(json => JSON.stringify(json));
      const lottieJson = this.transformToLottie(elementsArray);
      return new Animation().fromJSON(lottieJson);
    }

}

export default new Avatar();
