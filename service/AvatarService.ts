import jp from 'jsonpath';
import {findByTypeAndIndexNumber} from "../db/elements";
import {findByTypeAndElement} from "../db/animations";
import {Animation} from "@lottiefiles/lottie-js";

class Avatar {
    private readonly elements: Map<string, Element>;

    constructor() {
        this.elements = new Map();
    }

    addLottieBody(layersString: string) {
        const LOTTIE_BODY = `{"v":"5.9.6","fr":30,"ip":0,"op":90,"w":1600,"h":1600,"nm":"avatar","ddd":0,"assets":[],{layersSpot}}`;
        return LOTTIE_BODY.replace("{layersSpot}", `"layers": ${layersString}`);
    }

    changeElement(request) {
        this.elements[request.elementType] = findByTypeAndIndexNumber(request.elementType, request.number);

    }

    transformToLottie(jsonArray: string[]): Record<string, any> {
        let layers = jsonArray.sort((a, b) => {
            const aInd = jp.query(JSON.parse(a), '$.ind');
            const bInd = jp.query(JSON.parse(b), '$.ind');
            return aInd - bInd;
        }).join(',');
        const lottieJson = this.addLottieBody(layers);
        return JSON.parse(lottieJson);
    }

    getAnimation(animationType: string): Animation {
        let elementsArray = Object.values(this.elements)
            .map(element => findByTypeAndElement(animationType, element))
            .map(animation => {
                //TODO should be string value here, but it is array of numbers
                console.log("animation value array: " + animation.value_array.toString())
                return animation.value_array.toString()
            });
        const lottieJson = this.transformToLottie(elementsArray);
        return new Animation().fromJSON(lottieJson);
    }
}

export default new Avatar();
