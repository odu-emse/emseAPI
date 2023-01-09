import { defineConfig, configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		testNamePattern: ".*\\.spec\\.ts$",
		exclude: [...configDefaults.exclude],
		coverage: {
			provider: "c8",
			reporter: ["text", "html", "lcov"],
			reportsDirectory: "coverage"
		},
		reporters: ["verbose"]
	},
	plugins: [tsconfigPaths()]
});
