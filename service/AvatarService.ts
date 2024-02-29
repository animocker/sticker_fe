import {findByTypeAndIndexNumber} from "../db/elements";
import {findByTypeAndElement} from "../db/animations";
import {Animation} from "@lottiefiles/lottie-js";
import {ElementType} from "../db/enum";

class Avatar {
    private readonly elements: Map<ElementType, Element>;

    constructor() {
      this.elements = new Map<ElementType, Element>();
      Object.values(ElementType)
        .filter(it => isNaN(Number(it)))
        .forEach(elementType => {
          this.changeElement({elementType: elementType, number: 1});
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

    transformToLottie(jsonArray: string[]): Record<string, any> {
      const layers = jsonArray.sort((a, b) => {
        //console.log("A: " + a)
        const aInd = JSON.parse(a)["ind"];
        //console.log("B: " + b)
        const bInd = JSON.parse(b)["ind"];
        console.log("Comparing " + aInd + " and " + bInd);
        return aInd - bInd;
      }).join(",");
      const lottieJson = this.addLottieBody(layers);
      console.log(lottieJson);
      const jsons = JSON.parse(lottieJson);
      console.log("parsed");
      return jsons;
    }

    getAnimation(animationType: string): Animation {

      const elementsArray = Object.values(this.elements)
        .map(element => findByTypeAndElement(animationType, element))
        .map(animation => JSON.parse("[" + animation.value_array + "]"))
        .flatMap(json => json)
        .map(json => JSON.stringify(json));
      const lottieJson = this.transformToLottie(elementsArray);
      Object.values(lottieJson).forEach(value => {
        console.log(value["ind"]);
      });
      return new Animation().fromJSON(lottieJson);
    }
}

export default new Avatar();
