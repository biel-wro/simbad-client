import { IsPreviewEnabledPipe } from './is-preview-enabled.pipe';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';

describe('IsPreviewEnabledPipe', () => {
    it('should create an instance', () => {
        const pipe = new IsPreviewEnabledPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return true when artifact file type is PNG', () => {
        // given
        const pipe = new IsPreviewEnabledPipe();
        const artifact: ArtifactInfo = { fileType: 'PNG' } as ArtifactInfo;

        // when
        const actual = pipe.transform(artifact);

        // then
        expect(actual).toBeTruthy();
    });

    it('should return true when artifact file type is not PNG', () => {
        // given
        const pipe = new IsPreviewEnabledPipe();
        const artifact: ArtifactInfo = { fileType: 'PDF' } as ArtifactInfo;

        // when
        const actual = pipe.transform(artifact);

        // then
        expect(actual).toBeFalsy();
    });
});
