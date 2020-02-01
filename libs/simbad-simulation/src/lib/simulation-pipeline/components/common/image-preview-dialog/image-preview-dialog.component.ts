import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

export interface ImageViewerData {
    image: any
    name: string
}

@Component({
    selector: 'simbad-image-preview-dialog',
    templateUrl: './image-preview-dialog.component.html',
    styleUrls: ['./image-preview-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ImagePreviewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ImageViewerData
    ) { }

    submit() {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    ngOnInit() {}
}
