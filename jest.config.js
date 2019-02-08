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
};
