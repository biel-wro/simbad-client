import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

export interface ArtifactPreviewData {
    image?: any;
    text?: string;
    name: string;
}

@Component({
    selector: 'simbad-image-preview-dialog',
    templateUrl: './artifact-preview.component.html',
    styleUrls: ['./artifact-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactPreviewComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ArtifactPreviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ArtifactPreviewData
    ) {}

    submit() {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    ngOnInit() {}
}
