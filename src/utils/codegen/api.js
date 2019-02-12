const mockEnvs = ['test', 'development', 'production'];

const array = ['Locations'];

module.exports = array
    .map(endpoint => {
        console.log('v', process.env.NODE_ENV);
        const APIFolderName = mockEnvs.includes(process.env.NODE_ENV)
            ? 'mocked'
            : 'unmocked';

        return `export { default as ${endpoint} } from './${APIFolderName}/${endpoint.toLowerCase()}';`;
        // return `export { ${endpoint} } from './api/${APIFolderName}/index.js';`;
    })
    .join('');
