import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const layersSchema = tableSchema({
  name: "layers",
  columns: [
    { name: "animation_type", type: "string" },
    { name: "element_id", type: "string" },
    { name: "gender", type: "string" },
    { name: "value", type: "string" },
  ],
});

export const colorSetsSchema = tableSchema({
  name: "color_sets",
  columns: [], //use many-to-many relations, so no columns
});

export const colorsSchema = tableSchema({
  name: "colors",
  columns: [
    { name: "hex", type: "string" },
    { name: "name", type: "string" },
  ],
});

export const colorSetsColorsSchema = tableSchema({
  name: "color_sets_colors_m2m",
  columns: [
    { name: "color_id", type: "string" },
    { name: "color_set_id", type: "string" },
  ],
});

export const elementsSchema = tableSchema({
  name: "elements",
  columns: [
    { name: "number", type: "number" },
    { name: "type", type: "string" },
  ],
});

export const elementsColorSetsSchema = tableSchema({
  name: "elements_color_sets_m2m",
  columns: [
    { name: "element_id", type: "string" },
    { name: "color_set_id", type: "string" },
  ],
});
