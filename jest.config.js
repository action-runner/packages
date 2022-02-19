/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ["dist"],
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!<rootDir>/node_modules/",
        "tests/**/*.{ts,tsx}",
        "!index.ts"
    ],
    testTimeout: 20000
};