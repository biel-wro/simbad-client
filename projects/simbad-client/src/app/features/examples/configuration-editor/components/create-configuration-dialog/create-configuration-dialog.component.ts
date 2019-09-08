import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { State } from '../../../simulationState';
import { actionFormReset, actionFormUpdateRootObjects } from '../../store/form.actions';

@Component({
    selector: 'simbad-create-configuration-dialog',
    templateUrl: './create-configuration-dialog.component.html',
    styleUrls: ['./create-configuration-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateConfigurationDialogComponent implements OnInit {
    form: FormGroup;
    rootObjects = [{ name: 'model' }, { name: 'stream' }, { name: 'initial_configuration' }];

    constructor(public dialogRef: MatDialogRef<CreateConfigurationDialogComponent>, private store: Store<State>) {
        this.form = new FormGroup({
            model: new FormControl(),
            stream: new FormControl(),
            initial_configuration: new FormControl()
        });
    }

    submit() {
        const rootObjectClassNames = Object.keys(this.form.value).filter(key => this.form.value[key]);
        if (rootObjectClassNames.length) {
            this.store.dispatch(actionFormReset());
            this.store.dispatch(actionFormUpdateRootObjects({ rootObjectClassNames }));
        }
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close([]);
    }

    ngOnInit() {}
}
