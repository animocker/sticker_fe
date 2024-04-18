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

export default appSchema({
  version: 2,
  tables: [
    layersSchema,
  ]
});
