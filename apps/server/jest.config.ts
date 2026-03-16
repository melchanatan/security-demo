/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { useESM: true }],
    "^.+\\.mjs$": ["ts-jest", { useESM: true }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@security-demo/([^/]+)/(.*)$": "<rootDir>../../packages/$1/src/$2",
    "^@security-demo/([^/]+)$": "<rootDir>../../packages/$1/src/index.ts",
  },
  moduleDirectories: [
    "node_modules",
    "<rootDir>../../node_modules",
    "<rootDir>../../packages/db/node_modules",
  ],
  transformIgnorePatterns: ["/node_modules/(?!(@elysiajs|elysia|@orpc)/)"],
};
