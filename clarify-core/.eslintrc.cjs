

const { join } = require('path');

module.exports = {
    ignorePatterns: [
        '.eslintrc.cjs',
        'webpack.config.cjs',
        'jest.config.cjs',
        'node_modules/**',
        'dist/**',
        'tests/**/*.cjs',
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