module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@game/(.*)$': '<rootDir>/game/$1',
    '^@ui/(.*)$': '<rootDir>/ui/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
