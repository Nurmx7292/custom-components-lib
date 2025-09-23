import path from 'path';
import type { Configuration } from 'webpack';

type BuildMode = 'development' | 'production' | 'none';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
}

export default (env: EnvVariables = {}): Configuration => {
  const mode: BuildMode = env.mode ?? 'development';
  const isProduction = mode === 'production';
  const port = env.port ?? 3000;

  const config: Configuration = {
    mode,
    entry: isProduction ? path.resolve(__dirname, 'src', 'index.ts') : path.resolve(__dirname, 'src', 'main.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      ...(isProduction && {
        library: 'CustomComponentsLib',
        libraryTarget: 'umd',
        globalObject: 'this',
      }),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    ...(isProduction
      ? {
          externals: {
            react: {
              commonjs: 'react',
              commonjs2: 'react',
              amd: 'react',
              root: 'React',
            },
            'react-dom': {
              commonjs: 'react-dom',
              commonjs2: 'react-dom',
              amd: 'react-dom',
              root: 'ReactDOM',
            },
          },
        }
      : {
          devServer: {
            port,
            hot: true,
            open: true,
            static: {
              directory: path.resolve(__dirname, 'public'),
            },
          },
          devtool: 'eval-source-map',
        }),
  };

  return config;
};


