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
		reporters: ["verbose"],
		typecheck: {
			include: ["src/**/*.ts"],
			exclude:
				"**/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*",
			tsconfig: "tsconfig.json",
			ignoreSourceErrors: true,
			checker: "tsc"
		}
	},
	plugins: [tsconfigPaths()]
});
