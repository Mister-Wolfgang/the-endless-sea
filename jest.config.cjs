module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)', '<rootDir>/src/**/*.(test|spec).(ts|tsx|js)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/setupTests.ts'],
  
  // Configuration pour un affichage plus propre des tests
  verbose: true,
  silent: false,
  collectCoverage: false,
  
  // Reporter personnalisé pour un affichage plus propre
  reporters: [
    ['default', {
      summaryThreshold: 0
    }]
  ],
  
  // Supprimer les logs console pendant les tests (sauf erreurs)
  // setupFiles: ['<rootDir>/jest.setup.js'], // Fichier non trouvé, commenté
};
