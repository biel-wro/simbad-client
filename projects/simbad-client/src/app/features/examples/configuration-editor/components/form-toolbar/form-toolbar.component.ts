import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CreateConfigurationDialogComponent } from '../create-configuration-dialog/create-configuration-dialog.component';
import { FormsService } from '../../services/forms.service';

@Component({
    selector: 'simbad-form-toolbar',
    templateUrl: './form-toolbar.component.html',
    styleUrls: ['./form-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormToolbarComponent implements OnInit, OnDestroy {
    @Input()
    configurationModel$: Observable<any>;
    @Output()
    selectedRootObjectsChange = new EventEmitter<string[]>();
    @Output()
    planPatch = new EventEmitter<any>();

    subscription: Subscription;

    downloadJsonHref: any;

    constructor(private sanitizer: DomSanitizer, private dialog: MatDialog, private fs: FormsService) {}

    ngOnInit() {
        this.subscription = this.configurationModel$.subscribe(configuration => {
            const theJSON = JSON.stringify(configuration, null, 2);
            this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(
                'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
            );
        });
    }

    openCreateConfigurationDialog() {
        const dialogRef = this.dialog.open(CreateConfigurationDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedRootObjectsChange.emit(result);
        });
    }

    onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof FileReader !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const obj = JSON.parse(e.target.result);
                this.selectedRootObjectsChange.emit(Object.keys(obj));
                const patch = this.fs.configurationObjectToFormPatch(obj);
                this.planPatch.emit(patch);
            };

            if (inputNode.files[0]) reader.readAsText(inputNode.files[0]);
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
