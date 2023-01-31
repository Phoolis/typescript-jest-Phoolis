/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/bin/', '/build/', '/.git/'],

  // see https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules/
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
};