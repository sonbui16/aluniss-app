module.exports = {
  presets: ['module:metro-react-native-babel-preset',],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', 'ts', 'tsx'],
        alias: {
          '@': './src',
          type: './types',
        },
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },

    ]
  ],
};
