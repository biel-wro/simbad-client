import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    cliStepArtifacts,
    cliStepEndTimestamp,
    cliStepStartTimestamp,
    cliStepState, reportStepArtifacts, reportStepState
} from '../../../core/store/simulation/simulation-pipeline.selectors';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { CliRuntimeInfo } from '@simbad-cli-api/gen/models/cli-runtime-info';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '../../common/info-list/info-list.component';
import { downloadArtifact } from '@simbad-client/app/features/examples/simulation-pipeline/core/store/artifacts/artifacts.actions';
import { timeToTimeString } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/time-utils';
import { ArtifactsActionsService } from '@simbad-client/app/features/examples/simulation-pipeline/core/services/artifacts-actions.service';
import { ArtifactActionType } from '@simbad-client/app/features/examples/simulation-pipeline/core/models';
import { extractFilename } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/path-utils';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';

@Component({
    selector: 'simbad-client-cli-step',
    templateUrl: './cli-step.component.html',
    styleUrls: ['./cli-step.component.scss']
})
export class CliStepComponent implements OnInit, OnDestroy {
    runtimeInfo$: Observable<CliRuntimeInfo>;
    artifacts$: Observable<ArtifactInfo[]>;
    elapsedTime$: Observable<string>;
    taskContext$: Observable<ListElement[]>;

    timer$: Observable<number>;
    stopTimer$: Subject<void> = new Subject<void>();
    ngUnsubscribe$: Subject<void> = new Subject();

    constructor(
        private readonly store: Store<{}>) {
    }

    ngOnInit() {
        this.runtimeInfo$ = this.store.pipe(
            select(cliStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => status.cliRuntimeInfo)
        );

        this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(cliStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => !!status.finishedUtc)
        ).subscribe((finished: boolean) => {
            if (finished) this.stopTimer$.next();
        });

        this.taskContext$ = this.store.pipe(
            select(cliStepState),
            filter((state) => !!state),
            map((state) => this.buildTaskContextFromCliState(state))
        );

        this.timer$ = timer(0, 1000).pipe(
            takeUntil(this.stopTimer$)
        );

        this.elapsedTime$ = combineLatest([
            this.store.select(cliStepStartTimestamp).pipe(filter((time) => !!time)),
            this.store.select(cliStepEndTimestamp),
            this.timer$
        ]).pipe(
            map(([startTimestamp, endTimestamp]) => {
                return timeToTimeString(startTimestamp, endTimestamp);
            })
        );

        this.artifacts$ = this.store.select(cliStepArtifacts);

    }

    buildTaskContextFromCliState(state: SimulationStepInfo): ListElement[] {
        const conf = state.artifacts.find((artifact) => artifact.fileType === 'JSON');
        const { name } = conf;
        return [
            {
                key: 'Configuration file',
                value: name,
                download: () => {
                    this.store.dispatch(downloadArtifact({ id: conf.id, name }));
                    return console.log('Downloading artifact', conf.id);
                }
            },
            { key: 'Start Timestamp', value: state.startedUtc },
            { key: 'Stop Criterion', value: 'Population size' },
            { key: 'Status', value: state.status }
        ];
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
    }

}
