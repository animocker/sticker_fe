import { appSchema } from "@nozbe/watermelondb";
import { colorSetsColorsSchema, colorSetsSchema, colorsSchema, elementsColorSetsSchema, elementsSchema, layersSchema } from "./read-only/schema";
import { avatarStateSchema } from "./read-write/schema";

export default appSchema({
  version: 12,
  tables: [layersSchema, colorsSchema, colorSetsSchema, colorSetsColorsSchema, avatarStateSchema, elementsSchema, elementsColorSetsSchema],
});
