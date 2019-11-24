import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { NotificationService, ObjectsDefinitionsService } from '../../../../../core/core.module';

import { State } from '../../../simulationState';
import {
    ParameterDefinition,
    ParameterTree,
    ParameterTreeNode
} from '../../../../../core/configuration-management/models';
import { FormsService } from '../../services/forms.service';
import { selectFormValues, selectRootObjectClassNames } from '../../store/form.selectors';
import { updateFormValue } from '@simbad-client/app/features/examples/configuration-editor/store/form.actions';

@Component({
    selector: 'simbad-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {
    treeForm: FormGroup = new FormGroup({});
    tree$: Observable<ParameterTree>;
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
        this.tree$ = this.store.pipe(
            select(selectRootObjectClassNames),
            map((classNames: string[]) => {
                const rootParameters: ParameterTreeNode[] = this.buildRootParametersFromClassNames(classNames);
                this.buildFormForRootParameters(rootParameters);
                this.subscribeOnStoreChanges();
                return { rootParameters };
            })
        );

        this.subscribeOnFormChanges();
    }

    ngOnDestroy(): void {
        this.formChanges.unsubscribe();
        this.storeChanges.unsubscribe();
    }

    private buildRootParametersFromClassNames(classNames: string[]): ParameterTreeNode[] {
        return classNames.map((name: string) => {
            const definition: ParameterDefinition = this.ods.getByClassName(name);
            return this.ods.toParameterTreeNode(definition);
        });
    }

    private buildFormForRootParameters(rootParameters: ParameterTreeNode[]): void {
        rootParameters.map((node: ParameterTreeNode) => {
            this.fs.addNodeControlsToFormRecursive(this.treeForm, node);
        });
    }

    private subscribeOnStoreChanges(): void {
        this.storeChanges = this.store
            .pipe(select(selectFormValues))
            .subscribe(formValue => this.treeForm.patchValue(formValue, { emitEvent: false, onlySelf: true }));
    }

    private subscribeOnFormChanges(): void {
        this.formChanges = this.treeForm.valueChanges.pipe(debounceTime(500)).subscribe(formValue => {
            console.log(formValue);
            this.store.dispatch(updateFormValue({ formValue }));
        });
    }
}
