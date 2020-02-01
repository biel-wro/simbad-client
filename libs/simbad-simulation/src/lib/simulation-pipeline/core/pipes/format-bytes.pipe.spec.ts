import { FormatBytesPipe } from './format-bytes.pipe';

describe('FormatBytesPipe', () => {
    it('should create an instance', () => {
        const pipe = new FormatBytesPipe();
        expect(pipe).toBeTruthy();
    });

    it('should format bytes to kilobytes properly', () => {
        // given
        const pipe = new FormatBytesPipe();
        const bytes = 1234;
        const expected = '1.21 KB';

        // when
        const actual = pipe.transform(bytes);

        // then
        expect(actual).toBe(expected);
    });
});
