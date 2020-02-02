import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    loadSimulationResultsRequest,
    simulationResultsLoaded
} from '@simbad-results/lib/core/store/simulation-results.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { StatusService } from '@simbad-cli-api/gen';
import { of } from 'rxjs';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

@Injectable()
export class SimulationResultsEffects {
    loadSimulationResults$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadSimulationResultsRequest),
            switchMap(action => {
                return this.statusService.getLatestSimulations({}).pipe(
                    map(results => {
                        console.log(results);
                        return simulationResultsLoaded({ results });
                    }),
                    catchError(err => {
                        console.log(err);
                        this.notificationService.error('Failed to load simulation results');
                        return of(err);
                    })
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private statusService: StatusService,
        private notificationService: NotificationService
    ) {}
}
