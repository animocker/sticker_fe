import {Config} from "../model/Config";

class ConfigService {
  public getConfig():Config {
    return {
      isSizeChangeable: true,
      isColorChangeable: true,
      colorConfigs: []
    };
  }
}

export default new ConfigService();
