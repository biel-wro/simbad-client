import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { NotificationService, ObjectsDefinitionsService } from '../../../../core/core.module';

import { State } from '../../examples.state';
import { ParameterTree } from '../../../../core/configuration-management/models/parameter-tree';
import { FormsService } from '../forms-service';

@Component({
    selector: 'simbad-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
    tree: ParameterTree = {
        rootParameters: []
    };
    treeForm: FormGroup = new FormGroup({});
    configurationModel$: Observable<any>;

    constructor(
        private fb: FormBuilder,
        private store: Store<State>,
        private translate: TranslateService,
        private notificationService: NotificationService,
        private ods: ObjectsDefinitionsService,
        private fs: FormsService
    ) {}

    ngOnInit() {
        this.configurationModel$ = this.treeForm.valueChanges.pipe(
            map(value => {
                return this.fs.treeValueToConfigurationObject(this.fs.formValueToTree(value));
            })
        );
    }

    onSelectedRootObjectsChange(value: any) {
        console.log('Parent received', value);
        this.tree.rootParameters = (value as string[]).map(name =>
            this.ods.toParameterTreeNode(this.ods.getByClassName(name))
        );
    }
}
