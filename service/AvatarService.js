import Database from "../db/Database";
import jp from 'jsonpath';
import {findByTypeAndIndexNumber} from "../db/elements";

class Avatar {
    constructor() {
        this.elements = {};
    }

    addLottieBody(layersString) {
        const LOTTIE_BODY = `{"v":"5.9.6","fr":30,"ip":0,"op":90,"w":1600,"h":1600,"nm":"avatar","ddd":0,"assets":[],{layersSpot}}`;
        return LOTTIE_BODY.replace("{layersSpot}", `"layers": ${layersString}`);
    }

    changeElement(request) {
        return Database.findByTypeAndIndexNumber(request.elementType, request.number)
            .then((result) => {
                this.elements[request.elementType] = result;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    transformToLottie(jsonArray) {
        let layers = jsonArray.sort((a, b) => {
            const aInd = jp.query(JSON.parse(a), '$.ind');
            const bInd = jp.query(JSON.parse(b), '$.ind');
            return aInd - bInd;
        }).join(',');

        return this.addLottieBody(layers);
    }

    getAnimation(animationType) {
        let elementsArray = Object.values(this.elements)
            .map(element => Database.findByTypeAndElement(animationType, element))
            .flat();
        return this.transformToLottie(elementsArray);
    }
}

export default new Avatar();
