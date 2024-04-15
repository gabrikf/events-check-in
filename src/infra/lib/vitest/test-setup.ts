import "reflect-metadata";
import { afterAll } from "vitest";
import { resetDb } from "./helpers/reset-db";

afterAll(async () => {
  await resetDb();
});
