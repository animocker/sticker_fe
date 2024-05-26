import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const layersSchema = tableSchema({
  name: "layers",
  columns: [
    { name: "animation_type", type: "string" },
    { name: "element_nbr", type: "number" },
    { name: "element_type", type: "string" },
    { name: "gender", type: "string" },
    { name: "value", type: "string" },
  ],
});

export const colorSetsSchema = tableSchema({
  name: "color_sets",
  columns: [
    { name: "element_nbr", type: "number", isOptional: true },
    { name: "element_type", type: "string" },
  ],
});

export const colorsSchema = tableSchema({
  name: "colors",
  columns: [
    { name: "hex", type: "string" },
    { name: "name", type: "string" },
  ],
});

export const colorSetsColorsSchema = tableSchema({
  name: "color_sets_colors",
  columns: [
    { name: "color_id", type: "string" },
    { name: "color_set_id", type: "string" },
  ],
});
