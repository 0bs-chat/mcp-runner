import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {};

const schema = defineSchema({
  ...authTables,
  ...applicationTables,
});

export default schema;
