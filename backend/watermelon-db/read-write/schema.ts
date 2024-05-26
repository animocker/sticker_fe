import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const state = tableSchema({
  name: "state",
  columns: [
    { name: "element_nbr", type: "number" },
    { name: "element_type", type: "string" },
    { name: "gender", type: "string" },
    { name: "value", type: "string" },
  ],
});
