

const { join } = require('path');

module.exports = {
    ignorePatterns: [
        '.eslintrc.cjs',
        'webpack.config.js',
        'node_modules/**',
        'dist/**',
    ],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                packageDir: [__dirname, join(__dirname, '../')]
            },
        ],
    }
};