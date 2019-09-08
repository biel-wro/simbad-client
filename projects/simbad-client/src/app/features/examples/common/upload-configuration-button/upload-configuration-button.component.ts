import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { FormsService } from '@simbad-client/app/features/examples/configuration-editor/services/forms.service';
import {
    actionFormReset,
    actionFormUpdate,
    actionFormUpdateConfigurationName,
    actionFormUpdateRootObjects
} from '@simbad-client/app/features/examples/configuration-editor/store/form.actions';


@Component({
    selector: 'simbad-upload-configuration-button',
    templateUrl: './upload-configuration-button.component.html',
    styleUrls: ['./upload-configuration-button.component.scss']
})
export class UploadConfigurationButtonComponent implements OnInit {
    constructor(private store: Store<{}>, private fs: FormsService) {
    }

    ngOnInit() {

    }

    onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof FileReader !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const obj = JSON.parse(e.target.result);
                const rootObjectClassNames = Object.keys(obj);
                const formValue = this.fs.configurationToFormValue(obj);
                this.store.dispatch(actionFormReset());
                this.store.dispatch(actionFormUpdateRootObjects({ rootObjectClassNames }));
                this.store.dispatch(actionFormUpdate({ formValue }));
            };

            if (inputNode.files[0]) {
                this.store.dispatch(actionFormUpdateConfigurationName({ configurationName: inputNode.files[0].name }));
                reader.readAsText(inputNode.files[0]);
            }
        }
    }

}
