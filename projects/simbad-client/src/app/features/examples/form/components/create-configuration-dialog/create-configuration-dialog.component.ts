import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'simbad-create-configuration-dialog',
    templateUrl: './create-configuration-dialog.component.html',
    styleUrls: ['./create-configuration-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateConfigurationDialogComponent implements OnInit {
    form: FormGroup;
    rootObjects = [{ name: 'model' }, { name: 'stream' }, { name: 'initial_configuration' }];

    constructor(public dialogRef: MatDialogRef<CreateConfigurationDialogComponent>) {
        this.form = new FormGroup({
            model: new FormControl(),
            stream: new FormControl(),
            initial_configuration: new FormControl()
        });
    }

    submit() {
        const selectedOrderIds = Object.keys(this.form.value).filter(key => this.form.value[key]);
        this.dialogRef.close(selectedOrderIds);
    }

    cancel() {
        this.dialogRef.close([]);
    }

    ngOnInit() {}
}
