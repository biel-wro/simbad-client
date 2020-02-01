import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ObjectUtilsService {
    constructor() {}

    public deepAssign(obj: any, prop: string | string[], value: any): void {
        if (typeof prop === 'string') prop = prop.split('/');
        if (prop.length > 1) {
            const e = prop.shift();
            this.deepAssign(
                (obj[e] = Object.prototype.toString.call(obj[e]) === '[object Object]' ? obj[e] : {}),
                prop,
                value
            );
        } else {
            obj[prop[0]] = value;
        }
    }
}
