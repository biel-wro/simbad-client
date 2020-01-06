import { Pipe, PipeTransform } from '@angular/core';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';

@Pipe({
    name: 'isPreviewEnabled'
})
export class IsPreviewEnabledPipe implements PipeTransform {

    transform(value: ArtifactInfo, args?: any): any {
        return value.fileType === 'PNG';
    }

}
