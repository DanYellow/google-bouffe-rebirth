const path = require('path');
const fs = require('fs');

const globby = require('globby');
const v = require('voca');
const flow = require('lodash').flow;
const map = require('lodash').map;

const tmpDirPath = path.resolve(process.cwd(), '.tmp');

module.exports = (basePath = 'src/components', config = {}) => {
    const exportableBlocks = [];
    const listBlocksFiles = globby.sync([
        `${basePath}/**/*.jsx`,
        `!${basePath}/**/*.(test|spec|xtest).jsx`,
        `!src/components/tests/**/*.jsx`,
    ]);

    const pascalCase = flow(
        v.camelCase,
        v.titleCase
    );

    listBlocksFiles.forEach(componentFilePath => {
        const componentDirName = path.basename(path.dirname(componentFilePath));
        const componentFileName = path.basename(componentFilePath);

        // componentFileName with file's extension
        const name = path.basename(
            componentFileName,
            path.extname(componentFilePath)
        );

        let componentName = pascalCase(componentDirName);

        const newName = componentFilePath
            .replace(basePath, '')
            .replace(componentFileName, '');

        if (name !== 'index') {
            componentName = pascalCase(newName) + pascalCase(name);
        }

        if (name === 'index') {
            componentName = pascalCase(newName);
        }

        exportableBlocks.push({
            path: componentFilePath.replace('src/', ''),
            name: componentName,
        });
    });

    if (!fs.existsSync(tmpDirPath)) {
        fs.mkdirSync(tmpDirPath);
    }

    fs.writeFile(
        `${tmpDirPath}/${pascalCase(basePath)}.txt`,
        `-------------------- exported blocks folder: ${basePath} -------------------- \n\n${map(
            exportableBlocks,
            'name'
        ).join('\n')}`,
        function(err) {
            if (err) {
                return console.log(err);
            }

            console.log('The file was saved!');
        }
    );

    return exportableBlocks
        .map(
            block => `export { default as ${block.name} } from '${block.path}'`
        )
        .join(';');
};
