

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const clarifyData = {
    target: 'web',
    mode: 'production',
    entry: {
        'clarify-data': './src/ts/clarify-data.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].min.js',
        library: 'clarifyData',
        libraryTarget: 'window',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-optional-chaining',
                        ],
                        presets: ['@babel/preset-env', '@babel/typescript'],
                        sourceType: 'unambiguous',
                    },
                },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: '../clarify-data/src/ts/3rdparty/avc.wasm',
                    to: 'assets/3rdparty/',
                },
            ],
        }),
    ],
};

module.exports = clarifyData;