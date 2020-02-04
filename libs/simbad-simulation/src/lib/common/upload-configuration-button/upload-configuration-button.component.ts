import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadConfiguration } from '@simbad-simulation/lib/configuration-editor/store/form.actions';

@Component({
    selector: 'simbad-upload-configuration-button',
    templateUrl: './upload-configuration-button.component.html',
    styleUrls: ['./upload-configuration-button.component.scss']
})
export class UploadConfigurationButtonComponent implements OnInit {
    constructor(private store: Store<{}>) {}

    ngOnInit() {}

    onFileSelected(): void {
        const inputNode: any = document.querySelector('#file');

        if (typeof FileReader !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const configuration = JSON.parse(e.target.result);
                const name = inputNode.files[0].name;
                this.store.dispatch(loadConfiguration({ configuration, name }));
            };

            if (inputNode.files[0]) {
                reader.readAsText(inputNode.files[0]);
            }
        }
    }
}
