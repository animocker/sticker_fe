import { appSchema, tableSchema } from "@nozbe/watermelondb";


const layersSchema = tableSchema({
  name: "layers",
  columns: [
    { name: "animation_type", type: "string" },
    { name: "element_nbr", type: "number" },
    { name: "element_type", type: "string" },
    { name: "gender", type: "string" },
    { name: "value", type: "string" },
  ],
});

const colorsSchema = tableSchema({
  name: "colors",
  columns: [
    { name: "additional_colors", type: "string", isOptional: true },
    { name: "element_nbr", type: "number", isOptional: true},
    { name: "element_type", type: "string" },
    { name: "is_basic", type: "boolean" },
    { name: "main_color", type: "string" },
    { name: "stroke_color", type: "string" },
  ],
});

export default appSchema({
  version: 4,
  tables: [
    layersSchema,
    colorsSchema
  ]
});
