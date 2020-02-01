import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsService } from '@simbad-simulation/lib/configuration-editor/services/forms.service';
import {
    resetFormValue,
    updateConfigurationName,
    updateFormRootObjects,
    updateFormValue
} from '@simbad-simulation/lib/configuration-editor/store/form.actions';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

@Component({
    selector: 'simbad-upload-configuration-button',
    templateUrl: './upload-configuration-button.component.html',
    styleUrls: ['./upload-configuration-button.component.scss']
})
export class UploadConfigurationButtonComponent implements OnInit {
    constructor(private store: Store<{}>, private fs: FormsService, private ns: NotificationService) {}

    ngOnInit() {}

    onFileSelected(): void {
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
                this.ns.info(
                    `Uploaded configuration ${inputNode.files[0].name}. The original file was not changed`,
                    3000
                );
            };

            if (inputNode.files[0]) {
                this.store.dispatch(updateConfigurationName({ configurationName: inputNode.files[0].name }));
                reader.readAsText(inputNode.files[0]);
            }
        }
    }
}
