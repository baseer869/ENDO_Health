module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      },
    ],
    [
      'nativewind/babel',
      {allowModuleTransform: ['react-native-svg-transformer']},
    ],
    'react-native-paper/babel',
    'react-native-reanimated/plugin',
  ],
};
