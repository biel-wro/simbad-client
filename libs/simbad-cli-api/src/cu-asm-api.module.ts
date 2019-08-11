import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimbadCliClientModule } from '@simbad-cli-api/gen/simbad-cli-client.module';

const OPEN_API_FILE_URL = '/api/cli';

@NgModule({
    declarations: [],
    imports: [SimbadCliClientModule.forRoot({ rootUrl: OPEN_API_FILE_URL }), CommonModule]
})
export class CuAsmApiModule {}
