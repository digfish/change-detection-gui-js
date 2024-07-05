export const transform = {
  '^.+\\.[mtj]sx?$': 'babel-jest',
};
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
};

export const moduleFileExtensions = [ 'js', 'jsx', 'json', 'mjs','cjs'];

export default {
  transform,
  moduleNameMapper,
  moduleFileExtensions,
};
