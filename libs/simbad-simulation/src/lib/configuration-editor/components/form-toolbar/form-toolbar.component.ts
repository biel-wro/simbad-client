import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CreateConfigurationDialogComponent } from '../create-configuration-dialog/create-configuration-dialog.component';
import { FormsService } from '../../services/forms.service';
import { select, Store } from '@ngrx/store';
import { State } from '../../../simulationState';
import {
    selectConfiguration,
    selectConfigurationName,
    selectFormValues,
    selectRootObjectClassNames
} from '../../store/form.selectors';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import {
    resetFormValue,
    updateFormValue,
    updateConfigurationName,
    updateFormRootObjects
} from '../../store/form.actions';
import { FormControl } from '@angular/forms';
import {
    redirectAndStart,
    startSimulation
} from '@simbad-simulation/lib/simulation-pipeline/core/store/simulation/simulation-pipeline.actions';

interface ButtonModel {
    disabled: boolean;
    tooltip: string;
}

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
    configuration$: Observable<any>;
    buttonModel$: Observable<ButtonModel>;

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

        this.configuration$ = this.store.pipe(
            select(selectConfiguration),
            filter(configuration => !!configuration.formValue),
            map(({ formValue, name }) => {
                return {
                    value: this.fs.formValueToConfiguration(formValue),
                    name
                };
            })
        );

        this.buttonModel$ = this.store.pipe(
            select(selectRootObjectClassNames),
            map(names => {
                const disabled = !names || !names.length;
                const tooltip = disabled
                    ? 'simbad.configuration.forms.tooltip.redirectAndStartDisabled'
                    : 'simbad.configuration.forms.tooltip.redirectAndStart';
                return { disabled, tooltip };
            })
        );
    }

    ngOnDestroy() {
        this.nameChanges.unsubscribe();
        this.storeChanges.unsubscribe();
    }

    openCreateConfigurationDialog() {
        this.dialog.open(CreateConfigurationDialogComponent);
    }

    redirectAndStart() {
        this.store.dispatch(redirectAndStart());
    }

    private subscribeOnStoreChanges(): void {
        this.storeChanges = this.store
            .pipe(select(selectConfigurationName))
            .subscribe((name: string) => this.configurationNameControl.setValue(name));
    }

    private subscribeOnNameChanges(): void {
        this.nameChanges = this.configurationNameControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((configurationName: string) => {
                this.store.dispatch(updateConfigurationName({ configurationName }));
            });
    }
    public getConfigurationFileName(): string {
        return this.configurationNameControl.value + '.json';
    }
}
