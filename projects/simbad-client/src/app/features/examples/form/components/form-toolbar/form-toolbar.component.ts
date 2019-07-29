import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CreateConfigurationDialogComponent } from '../create-configuration-dialog/create-configuration-dialog.component';

@Component({
    selector: 'simbad-form-toolbar',
    templateUrl: './form-toolbar.component.html',
    styleUrls: ['./form-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormToolbarComponent implements OnInit {
    @Input()
    configurationModel$: Observable<any>;
    @Output()
    selectedRootObjectsChange = new EventEmitter<string[]>();
    downloadJsonHref: any;

    constructor(private sanitizer: DomSanitizer, private dialog: MatDialog) {}

    ngOnInit() {
        this.configurationModel$.subscribe(configuration => {
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
}
