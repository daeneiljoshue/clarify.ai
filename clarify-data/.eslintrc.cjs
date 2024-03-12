

module.exports = {
    ignorePatterns: [
        'src/ts/3rdparty/**',
        'node_modules/**',
        'dist/**',
    ],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['jest'],
};