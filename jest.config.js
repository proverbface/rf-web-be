module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/unit/**/*.spec.(js|jsx|ts|tsx)'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
