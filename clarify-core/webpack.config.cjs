
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const webConfig = {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'clarify-core': './src/api.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].min.js',
        library: 'clarifyCore',
        libraryTarget: 'window',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            url: false,
        },
        alias: {
            'clarify-data': path.resolve(__dirname, '../../clarify-data'), // Adjusted path to reflect clarify-data in the root directory
            // Other aliases...
        },
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
                    from: '../../clarify-data/src/ts/3rdparty/avc.wasm', // Adjusted path to reflect clarify-data in the root directory
                    to: 'assets/3rdparty/',
                },
            ],
        }),
    ],
};

module.exports = webConfig;

