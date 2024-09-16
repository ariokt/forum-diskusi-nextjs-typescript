// jest.config.js
const nextJest = require('next/jest');

// Create a custom config to extend the Next.js default config
const createJestConfig = nextJest({
  dir: './',
});

// Add custom Jest configuration
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    // Use ts-jest to handle TypeScript files
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

module.exports = createJestConfig(customJestConfig);
