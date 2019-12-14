import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HostService } from '@simbad-host-api/gen';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';
import {
    downloadArtifact,
    openArtifact
} from './artifacts.actions';
import { SimulationService, StatusService } from '@simbad-cli-api/gen';

@Injectable()
export class ArtifactsEffects {

    openArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(openArtifact),
            switchMap((action) => {
                return this.hostService.openLocation({ body: { path: action.path } }).pipe(
                    catchError(err => {
                        console.log(err);
                        this.notificationService.error(`Failed to open ${action.path}.`);
                        return of(err);
                    })
                );
            }),
        );
    }, { dispatch: false, resubscribeOnError: true  });

    downloadArtifact$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(downloadArtifact),
            tap((action) => {
                this.notificationService.info(`${action.name} download started.`);
            }),
            switchMap((action) => {
                return this.statusService.downloadArtifact({ id: action.id }).pipe(
                    map((response) => {
                        const downloadURL = window.URL.createObjectURL(response);
                        const link = document.createElement('a');
                        link.href = downloadURL;
                        link.download = action.name;
                        link.click();
                    }),
                    catchError(err => {
                        console.log(err);
                        this.notificationService.error(`Failed to download ${action.name}.`);
                        return of(err);
                    }),
                    tap(() => this.notificationService.success(`${action.name} download finished.`))
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
    ) {
    }

}
