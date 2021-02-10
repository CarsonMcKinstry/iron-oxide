module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["index.ts"],
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
};
