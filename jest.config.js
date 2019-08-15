module.exports = {
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular/preprocessor.js'
    },
    resolver: '@nrwl/builders/plugins/jest/resolver',
    moduleFileExtensions: ['ts', 'js', 'html'],
    collectCoverage: true,
    moduleNameMapper: {
        '^@simbad-cli-api(.*)$': `${__dirname}/libs/simbad-cli-api/src$1`,
        '^@simbad-client(.*)$': `${__dirname}/projects/simbad-client/src$1`,
    },
    globals: {
        "ts-jest": {
            enableTsDiagnostics: true
        },
        __TRANSFORM_HTML__: true
    },
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
