module.exports = {
    name: 'simbad-results',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs/simbad-results',
    setupTestFrameworkScriptFile: './src/test-setup.ts',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
