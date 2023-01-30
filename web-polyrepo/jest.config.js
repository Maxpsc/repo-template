// https://jestjs.io/docs/configuration

module.exports = {
  verbose: false,
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest/dist',
    '^.+\\.svg$': '<rootDir>/test/svgTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
}
