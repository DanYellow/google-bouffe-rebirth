const coverageThreshold = 85;

module.exports = {
    // preset: 'jest-puppeteer',
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.{js, jsx, mjs}',
        '!src/**/*.xtest.{js, jsx, mjs}',
        '!src/utils/codegen/**/*.{js, jsx, mjs}',
    ],
    testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'],
    coverageThreshold: {
        global: {
            branches: coverageThreshold,
            functions: coverageThreshold,
            lines: coverageThreshold,
            statements: -10, // will fail if there is more than 10 uncovered statements
        },
    },
    setupFiles: [
        '<rootDir>/configs/polyfills.js',
        '<rootDir>/configs/jest/setup.js',
        // 'jest-localstorage-mock',
    ],
    // testEnvironment: 'jest-environment-jsdom-global',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.(css|pcss)$': '<rootDir>/configs/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|css|json)$)':
            '<rootDir>/configs/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleFileExtensions: [
        'web.js',
        'mjs',
        'js',
        'json',
        'web.jsx',
        'jsx',
        'node',
    ],
};
