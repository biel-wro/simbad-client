import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HostService } from '@simbad-host-api/gen';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';
import { downloadArtifact, openArtifact, previewArtifact } from './artifacts.actions';
import { SimulationService, StatusService } from '@simbad-cli-api/gen';
import { ImagePreviewDialogComponent } from '@simbad-client/app/features/examples/simulation-pipeline/components/common/image-preview-dialog/image-preview-dialog.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ArtifactsEffects {

    openArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(openArtifact),
            switchMap((action) => {
                return this.hostService.openLocation({ body: { path: action.path } }).pipe(
                    catchError(err => {
                        this.notificationService.error(`Failed to open ${action.path}`);
                        return of(err);
                    })
                );
            })
        );
    }, { dispatch: false, resubscribeOnError: true });

    downloadArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(downloadArtifact),
            tap((action) => {
                this.notificationService.info(`${action.name} download started`);
            }),
            switchMap((action) => {
                return this.statusService.downloadArtifact({ id: action.id }).pipe(
                    map((response) => {
                        const downloadURL = window.URL.createObjectURL(response);
                        const link = document.createElement('a');
                        link.href = downloadURL;
                        link.download = action.name;
                        link.click();
                        this.notificationService.success(`${action.name} download finished`);
                    }),
                    catchError(err => {
                        this.notificationService.error(`Failed to download ${action.name}`);
                        return of(err);
                    })
                );
            })
        );
    }, { dispatch: false, resubscribeOnError: true });

    previewArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(previewArtifact),
            switchMap(({ id, name }) => {
                return this.statusService.downloadArtifact({ id }).pipe(
                    map((response) => {
                        const objectURL = URL.createObjectURL(response);
                        const image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        this.dialog.open(
                            ImagePreviewDialogComponent,
                            {
                                data: { image, name }
                            }
                        );
                    }),
                    catchError((err) => {
                        console.log(err);
                        this.notificationService.error(`Failed to preview ${name}`);
                        return of(err);
                    })
                );
            })
        );
    }, { dispatch: false, resubscribeOnError: true });

    constructor(
        private actions$: Actions,
        private statusService: StatusService,
        private simulationService: SimulationService,
        private hostService: HostService,
        private notificationService: NotificationService,
        private readonly dialog: MatDialog,
        private readonly sanitizer: DomSanitizer
    ) {
    }

}
