module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@pages': './src/pages',
          '@containers': './src/containers',
          '@context': './src/context',
          '@components': './src/components',
          '@models': './src/models',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@routes': './src/routes',
          '@reducers': './src/reducers',
          '@actions': './src/actions',
          '@assets': './src/assets',
        },
      },
    ]],
}


