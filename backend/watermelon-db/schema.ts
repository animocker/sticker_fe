import { appSchema, tableSchema } from "@nozbe/watermelondb";

const animationSchema = tableSchema({
  name: "animations",
  columns: [
    { name: "element_id", type: "string", isIndexed: true},
    { name: "type", type: "string", isIndexed: true },
    { name: "value_array", type: "string" }, // This will be a stringified version of the array
  ],
});

const elementSchema = tableSchema({
  name: "elements",
  columns: [
    { name: "gender", type: "string", isIndexed: true },
    { name: "icon", type: "string" },
    { name: "idx_nbr", type: "number", isIndexed: true },
    { name: "type", type: "string", isIndexed: true },
  ],
});

export default appSchema({
  version: 1,
  tables: [
    animationSchema,
    elementSchema,
  ]
});
