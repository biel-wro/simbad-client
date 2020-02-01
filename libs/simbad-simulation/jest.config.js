module.exports = {
    name: 'simbad-simulation',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs/simbad-simulation',
    setupTestFrameworkScriptFile: './src/test-setup.ts',
    snapshotSerializers: [
        'jest-preset-angular/AngularSnapshotSerializer.js',
        'jest-preset-angular/HTMLCommentSerializer.js'
    ]
};
