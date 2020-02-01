import { Pipe, PipeTransform } from '@angular/core';
import { formatBytes } from '../functions/size-format-utils';

@Pipe({
    name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return formatBytes(value);
    }
}
