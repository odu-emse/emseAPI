import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
	"transform": {
		"^.+\\.ts$": "ts-jest"
	},
	rootDir: './',
	"moduleFileExtensions": [
		"ts",
		"js"
	],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	"testRegex": ".*\\.spec\\.ts$",
	"testEnvironment": "node"
};