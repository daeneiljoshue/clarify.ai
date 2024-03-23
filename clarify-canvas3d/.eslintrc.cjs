

module.exports = {
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
        '.eslintrc.cjs',
        'webpack.config.js',
        'node_modules/**',
        'dist/**',
    ],
};