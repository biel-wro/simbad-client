import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ParameterTreeNode } from '@simbad-client/app/core/configuration-management/models';
import { ObjectsDefinitionsService } from '@simbad-client/app/core/configuration-management/objects-definitions.service';
import { FormGroup } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { selectNodeValue } from '@simbad-simulation/lib/configuration-editor/store/form.selectors';

@Component({
    selector: 'simbad-complex-parameter',
    templateUrl: './complex-parameter.component.html',
    styleUrls: ['./complex-parameter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplexParameterComponent implements OnInit {
    @Input() node: ParameterTreeNode;
    @Input() level: number;
    @Input() form: FormGroup;
    @Input() parentPath: string;
    @Input() buildingFromEnum: string;

    formControlValueInStore: Observable<any>;
    formControlValueUpdate: Subject<any> = new Subject();
    ngUnsubscribe: Subject<void> = new Subject();

    chosenOption: any;
    chosenEnumParameter: ParameterTreeNode;

    constructor(private ods: ObjectsDefinitionsService, private fs: FormsService, private store: Store<{}>) {}

    ngOnInit() {
        // if (this.node.definition.possibleClasses) {
        //     this.chosenOption = this.node.value || this.node.definition.defaultValue;
        //     this.chosenEnumParameter = this.ods.toParameterTreeNode(
        //         this.ods.getByClassName(this.chosenOption),
        //         this.node.path
        //     );
        // }

        if (
            this.node.definition.className === 'default_attributes' ||
            this.node.definition.className === 'initial_configuration'
        ) {
            console.log(`FaultyNode: ${this.node.definition.className}`, this.node, this.parentPath);
        }

        this.formControlValueInStore = this.store.pipe(
            takeUntil(this.ngUnsubscribe),
            select(selectNodeValue(this.node.path + '/class')),
            distinctUntilChanged()
        );

        this.formControlValueInStore
            .pipe(
                takeUntil(this.ngUnsubscribe),
                take(1)
            )
            .subscribe(value => {
                if (value) {
                    this.buildExistingEnumOption(value);
                } else {
                    this.buildDefaultEnumOption();
                }
            });

        this.formControlValueUpdate
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(value => console.log('Form control value update emit', value));
    }

    getDisplayName(className: string) {
        return className.startsWith('d_') ? className.slice(2) : className;
    }

    onSelect($event: any): void {
        const oldParameter = this.chosenEnumParameter;
        this.fs.addNodeControlsToFormRecursive(
            this.form,
            this.ods.toParameterTreeNode(this.ods.getByClassName($event.value), this.node.path)
        );
        this.chosenEnumParameter = this.ods.toParameterTreeNode(this.ods.getByClassName($event.value), this.node.path);
        this.fs.removeNodeControlsFromForm(this.form, oldParameter);
    }

    buildDefaultEnumOption(): void {
        if (this.node.definition.possibleClasses) {
            this.chosenOption = this.node.value || this.node.definition.defaultValue;
            this.chosenEnumParameter = this.ods.toParameterTreeNode(
                this.ods.getByClassName(this.chosenOption),
                this.node.path
            );
        }
    }

    isInitialConfiguration(): boolean {
        return this.node.definition.className === 'initial_configuration';
    }

    buildExistingEnumOption(value: any): void {
        if (this.node.definition.possibleClasses) {
            this.chosenOption = value;
            this.chosenEnumParameter = this.ods.toParameterTreeNode(this.ods.getByClassName(value), this.node.path);
            this.fs.addNodeControlsToFormRecursive(this.form, this.chosenEnumParameter);
        }
    }
}
