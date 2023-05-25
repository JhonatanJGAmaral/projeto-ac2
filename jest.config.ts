import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: [".*\\.test\\.ts$", ".*\\.spec\\.ts$"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  collectCoverageFrom: ["src/**/*.(t|j)s", "libs/**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/src/", "<rootDir>/test/"],
};

export default config;
