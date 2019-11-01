import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CreateConfigurationDialogComponent } from '../create-configuration-dialog/create-configuration-dialog.component';
import { FormsService } from '../../services/forms.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../simulationState';
import { selectConfigurationName, selectFormValues } from '../../store/form.selectors';
import { debounceTime, filter, map } from 'rxjs/operators';
import {
    resetFormValue,
    updateFormValue,
    updateConfigurationName,
    updateFormRootObjects
} from '../../store/form.actions';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'simbad-form-toolbar',
    templateUrl: './form-toolbar.component.html',
    styleUrls: ['./form-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormToolbarComponent implements OnInit, OnDestroy {
    configurationJsonHref$: Observable<SafeUrl>;
    configurationNameControl: FormControl;
    storeChanges: Subscription;
    nameChanges: Subscription;

    constructor(
        private sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private fs: FormsService,
        private store: Store<State>
    ) {
    }

    ngOnInit() {
        this.configurationJsonHref$ = this.store.pipe(
            select(selectFormValues),
            filter(formValue => !!formValue),
            map(formValue => {
                const configuration = this.fs.formValueToConfiguration(formValue);
                const theJSON = JSON.stringify(configuration, null, 2);
                return this.sanitizer.bypassSecurityTrustUrl(
                    'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
                );
            })
        );
        this.configurationNameControl = new FormControl();
        this.subscribeOnStoreChanges();
        this.subscribeOnNameChanges();
    }


    ngOnDestroy() {
        this.nameChanges.unsubscribe();
        this.storeChanges.unsubscribe();
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
                const formValue = this.fs.configurationToFormValue(obj);
                this.store.dispatch(resetFormValue());
                this.store.dispatch(updateFormRootObjects({ rootObjectClassNames }));
                this.store.dispatch(updateFormValue({ formValue }));
            };

            if (inputNode.files[0]) {
                this.store.dispatch(updateConfigurationName({configurationName: inputNode.files[0].name}));
                reader.readAsText(inputNode.files[0]);
            }
        }
    }

    private subscribeOnStoreChanges(): void {
        this.storeChanges = this.store.pipe(
            select(selectConfigurationName)
        ).subscribe((name: string) => this.configurationNameControl.setValue(name));
    }

    private subscribeOnNameChanges(): void {
        this.nameChanges = this.configurationNameControl.valueChanges.pipe(
            debounceTime(500)
        ).subscribe((configurationName: string) => {
            this.store.dispatch(updateConfigurationName({ configurationName }));
        });
    }
    public getConfigurationFileName(): string {
        return this.configurationNameControl.value + '.json';
    }

}
