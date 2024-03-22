// lint-staged.config.js

const micromatch = require('micromatch');

function containsInPath(pattern, list) {
    return list.filter((item) => micromatch.contains(item, pattern));
}

function makePattern(extension) {
    return `**/*.${extension}`;
}

module.exports = (stagedFiles) => {
    const eslintExtensions = ['ts', 'tsx', 'js'].map(makePattern);
    const scssExtensions = ['scss'].map(makePattern);
    const eslintFiles = micromatch(stagedFiles, eslintExtensions);
    const scssFiles = micromatch(stagedFiles, scssExtensions);

    const tests = containsInPath('/tests/cypress', eslintFiles);
    const clarifyData = containsInPath('/clarify-data/', eslintFiles);
    const clarifyCore = containsInPath('/clarify-core/src', eslintFiles);
    const clarifyCanvas = containsInPath('/clarify-canvas/', eslintFiles);
    const clarifyCanvas3d = containsInPath('/clarify-canvas3d/', eslintFiles);
    const clarifyUI = containsInPath('/clarify-ui/', eslintFiles);

    const mapping = {};
    const commands = [];
    mapping['npx stylelint --fix '] = scssFiles.join(' ');
    mapping['yarn run precommit:clarify-tests '] = tests.join(' ');
    mapping['yarn run precommit:clarify-ui '] = clarifyUI.join(' ');
    mapping['yarn run precommit:clarify-data '] = clarifyData.join(' ');
    mapping['yarn run precommit:clarify-core '] = clarifyCore.join(' ');
    mapping['yarn run precommit:clarify-canvas '] = clarifyCanvas.join(' ');
    mapping['yarn run precommit:clarify-canvas3d '] = clarifyCanvas3d.join(' ');

    for (const command of Object.keys(mapping)) {
        const files = mapping[command];
        if (files.length) {
            commands.push(`${command} ${files}`);
        }
    }

    return commands;
};
