import tsconfigPaths from "vite-tsconfig-paths"; // only if you are using custom tsconfig paths

import "reflect-metadata";
const { defineConfig } = require("vitest/config");
require("dotenv").config({ path: ".env.test" });
export default defineConfig({
  test: {
    setupFiles: ["./src/infra/lib/vitest/test-setup.ts"],
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  plugins: [tsconfigPaths()],
});
