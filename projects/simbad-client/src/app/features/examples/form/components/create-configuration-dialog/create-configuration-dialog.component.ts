import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'simbad-create-configuration-dialog',
    templateUrl: './create-configuration-dialog.component.html',
    styleUrls: ['./create-configuration-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateConfigurationDialogComponent implements OnInit {
    form: FormGroup;
    rootObjects = [
        { name: 'model' },
        { name: 'stream' },
        { name: 'initial_configuration' }
    ];

    constructor(
        public dialogRef: MatDialogRef<CreateConfigurationDialogComponent>,
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            rootObjects: new FormArray([])
        });

        this.addCheckboxes();
    }

    submit() {
        const selectedOrderIds = this.form.value.rootObjects
            .map((v, i) => (v ? this.rootObjects[i].name : null))
            .filter(v => v !== null);
        console.log(selectedOrderIds);
        this.dialogRef.close(selectedOrderIds);
    }

    cancel() {
        this.dialogRef.close([]);
    }

    ngOnInit() {}

    private addCheckboxes() {
        this.rootObjects.forEach(() => {
            const control = new FormControl();
            (this.form.controls.rootObjects as FormArray).push(control);
        });
    }
}
