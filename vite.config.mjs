import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: { label: "unit", color: "blue" },
          dir: "src/use-cases",
        },
      },
      {
        extends: true,
        test: {
          name: { label: "e2e", color: "green" },
          dir: "src/http/controllers",
          environment:
            "prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
});
