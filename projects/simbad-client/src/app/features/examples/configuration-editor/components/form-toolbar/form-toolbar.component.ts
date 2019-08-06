import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CreateConfigurationDialogComponent } from '../create-configuration-dialog/create-configuration-dialog.component';
import { FormsService } from '../../services/forms.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../examples.state';
import { selectFormValues } from '../../store/form.selectors';
import { filter, map } from 'rxjs/operators';
import { actionFormReset, actionFormUpdate, actionFormUpdateRootObjects } from '../../store/form.actions';

@Component({
    selector: 'simbad-form-toolbar',
    templateUrl: './form-toolbar.component.html',
    styleUrls: ['./form-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormToolbarComponent implements OnInit {
    configurationJsonHref$: Observable<SafeUrl>;

    constructor(
        private sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private fs: FormsService,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.configurationJsonHref$ = this.store.pipe(
            select(selectFormValues),
            filter(formValue => !!formValue),
            map(formValue => {
                const configuration = this.fs.formValueToConfigurationObject(formValue);
                const theJSON = JSON.stringify(configuration, null, 2);
                return this.sanitizer.bypassSecurityTrustUrl(
                    'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
                );
            })
        );
    }

    openCreateConfigurationDialog() {
        this.dialog.open(CreateConfigurationDialogComponent);
    }

    onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof FileReader !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const obj = JSON.parse(e.target.result);
                const rootObjectClassNames = Object.keys(obj);
                const formValue = this.fs.configurationObjectToFormPatch(obj);
                this.store.dispatch(actionFormReset());
                this.store.dispatch(actionFormUpdateRootObjects({ rootObjectClassNames }));
                this.store.dispatch(actionFormUpdate({ formValue }));
            };

            if (inputNode.files[0]) reader.readAsText(inputNode.files[0]);
        }
    }
}
