import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: { autodocs: 'tag' },
  webpackFinal: async (baseConfig) => {
    const rules = [
      ...(baseConfig.module?.rules ?? []),
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: { modules: { localIdentName: '[name]__[local]--[hash:base64:5]' } },
          },
          require.resolve('sass-loader'),
        ],
      },
    ];
    return {
      ...baseConfig,
      module: {
        ...(baseConfig.module ?? {}),
        rules,
      },
    };
  },
};
export default config;


