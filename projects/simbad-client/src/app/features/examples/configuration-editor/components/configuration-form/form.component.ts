import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';

import { NotificationService, ObjectsDefinitionsService } from '../../../../../core/core.module';

import { State } from '../../../simulationState';
import {
    ParameterDefinition,
    ParameterTree,
    ParameterTreeNode
} from '../../../../../core/configuration-management/models';
import { FormsService } from '../../services/forms.service';
import { updateFormValue } from '../../store/form.actions';
import { selectFormValues, selectRootObjectClassNames } from '../../store/form.selectors';
import { isEqual, isEmpty } from 'lodash';

@Component({
    selector: 'simbad-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
    treeForm: FormGroup = new FormGroup({});
    tree$: Observable<ParameterTree>;
    formValues$: Observable<any>;
    rootObjectNames$: Observable<string[]>;
    ngUnsubscribe: Subject<void> = new Subject<void>();
    formChanges: Subscription;
    storeChanges: Subscription;

    constructor(
        private fb: FormBuilder,
        private store: Store<State>,
        private translate: TranslateService,
        private notificationService: NotificationService,
        private ods: ObjectsDefinitionsService,
        private fs: FormsService
    ) {
    }

    ngOnInit() {
        this.formValues$ = this.store.select(selectFormValues).pipe(
            filter((value) => !isEmpty(value)),
            distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
            tap((val) => console.log('Distinct form emits', val))
        );

        this.rootObjectNames$ = this.store.select(selectRootObjectClassNames).pipe(
            filter((value) => !!value.length)
        );

        this.tree$ = combineLatest([
            this.rootObjectNames$,
            this.formValues$
        ]).pipe(
            map(([classNames, value]: [string[], any]) => {
                const rootParameters: ParameterTreeNode[] = this.buildRootParametersFromClassNames(classNames, value);
                this.buildFormForRootParameters(rootParameters);
                this.subscribeOnStoreChanges();
                return { rootParameters };
            })
        );

        this.subscribeOnFormChanges();
    }

    ngOnDestroy(): void {
    }

    private buildRootParametersFromClassNames(classNames: string[], formValue?: any): ParameterTreeNode[] {
        console.log(classNames, formValue);
        return classNames.map((name: string) => {
            const definition: ParameterDefinition = this.ods.getByClassName(name);
            let node = this.ods.toParameterTreeNode(definition);
            const value = formValue && formValue[node.path] ? formValue[node.path] : undefined;
            console.log('node', node, value, formValue);
            node = { ...node, value };
            return node;
        });
    }


    private buildFormForRootParameters(rootParameters: ParameterTreeNode[]): void {
        rootParameters.map((node: ParameterTreeNode) => {
            this.fs.addNodeControlsToFormRecursive(this.treeForm, node);
        });
    }

    // private fillForm(value: any): void {
    //
    // };

    private subscribeOnStoreChanges(): void {
        this.storeChanges = this.store
            .pipe(select(selectFormValues))
            .subscribe(formValue => this.treeForm.patchValue(formValue, { emitEvent: false, onlySelf: true }));
    }

    private subscribeOnFormChanges(): void {
        this.formChanges = this.treeForm.valueChanges.pipe(debounceTime(500)).subscribe(formValue => {
            this.store.dispatch(updateFormValue({ formValue }));
        });
    }
}
