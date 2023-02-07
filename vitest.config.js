import { defineConfig, configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import swc from "unplugin-swc";

export default defineConfig({
	test: {
		environment: "node",
		testNamePattern: ".*\\.spec\\.ts$",
		exclude: [...configDefaults.exclude],
		coverage: {
			reporter: ["text", "html", "lcov"],
			reportsDirectory: "coverage"
		},
		reporters: ["verbose"]
	},
	plugins: [
		// TS path resolution
		tsconfigPaths(),
		// Vite plugin
		swc.vite(),
		// Rollup plugin
		swc.rollup()
	]
});
