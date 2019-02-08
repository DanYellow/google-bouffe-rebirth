const path = require('path');
const globby = require('globby');
const v = require('voca');
const flow = require('lodash').flow;

module.exports = (basePath = 'src/components', config = {}) => {
  const exportableBlocks = [];
  const listBlocksFiles = globby.sync([
    `${basePath}/**/*.jsx`,
    `!${basePath}/**/*.(test|spec).jsx`,
  ]);

  const pascalCase = flow(
    v.camelCase,
    v.titleCase
  );

  listBlocksFiles.forEach(componentFilePath => {
    const componentDirName = path.basename(path.dirname(componentFilePath));
    const componentFileName = path.basename(
      componentFilePath,
      path.extname(componentFilePath)
    );

    let componentName = pascalCase(componentDirName);

    if (config.addFileName) {
      componentName = componentName + pascalCase(componentFileName);
    }

    exportableBlocks.push({
      path: componentFilePath.replace('src/', ''),
      name: componentName,
    });
  });

  return exportableBlocks
    .map(block => `export { default as ${block.name} } from '${block.path}'`)
    .join(';');
};
