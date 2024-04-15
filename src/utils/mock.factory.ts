import { GenerateMockOptions, generateMock } from "@anatine/zod-mock";
import { z } from "zod";

export const mockFactory =
  <T extends z.ZodTypeAny>(schema: T) =>
  (overrides?: Partial<z.infer<T>>, options?: GenerateMockOptions) => ({
    ...generateMock(schema, options),
    ...overrides,
  });
