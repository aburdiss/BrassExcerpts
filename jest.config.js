module.exports = {
  preset: 'react-native',
  coverageThreshold: {
    global: {
      statements: 54,
      branches: 29,
      functions: 24,
      lines: 64,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
    '<rootDir>/jest/setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-animatable|react-native-search-bar|react-native-idle-timer|react-native-pinchable|react-native-calendar-strip|react-native-collapsible|react-native-collapsible/Accordion|react-native-scalable-image|react-native-modal|react-native-dynamic|react-native-iphone-x-helper|react-native-reanimated|react-native-vector-icons|react-native-screens|react-native-splash-screen|react-navigation-tabs|@?react-navigation|react-native-gesture-handler|@react-native-segmented-control/segmented-control|react-native-linear-gradient|react-native-picker-select|@react-native-picker/picker)/)',
  ],
};
