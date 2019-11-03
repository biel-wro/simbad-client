import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    cliStepStartTimestamp,
    cliStepState,
    selectCliStepState
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.selectors';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { CliRuntimeInfo } from '@simbad-cli-api/gen/models/cli-runtime-info';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '@simbad-client/app/features/examples/simulation-pipeline/steps/cli-step/components/info-list/info-list.component';
import { openArtifact } from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.actions';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';

@Component({
    selector: 'simbad-client-cli-step',
    templateUrl: './cli-step.component.html',
    styleUrls: ['./cli-step.component.scss']
})
export class CliStepComponent implements OnInit, OnDestroy {
    runtimeInfo$: Observable<CliRuntimeInfo>;
    artifactList$: Observable<ListElement[]>;
    elapsedTime$: Observable<string>;
    taskContext$: Observable<ListElement[]>;

    timer$: Observable<number>;
    stopTimer$: Subject<void> = new Subject<void>();
    isCliStepFinished$: Observable<boolean>;
    ngUnsubscribe$: Subject<void> = new Subject();


    constructor(private store: Store<{}>) {
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
            map((state) => this.buildTaskContextFromCliState(state))
        );

        this.timer$ = timer(0, 1000).pipe(
            takeUntil(this.stopTimer$)
        );

        this.elapsedTime$ = combineLatest([
            this.store.select(cliStepStartTimestamp),
            this.timer$
        ]).pipe(
            map(([timestamp, tick]) => {
                return this.timeToTimeString(timestamp);
            }),
        );

        this.artifactList$ = this.store.pipe(
            select(cliStepState),
            filter((state) => !!state),
            map((state) => state.artifacts.filter((artifact) => !artifact.path.endsWith('.json'))),
            map((artifacts) => this.artifactsToElementList(artifacts))
        );

    }

    timeToTimeString(timestamp: string) {
        const now = Date.now();
        const start = Date.parse(timestamp);
        const diff = now - start;
        return new Date(diff).toISOString().substr(11, 8);
    }

    buildTaskContextFromCliState(state: SimulationStepInfo): ListElement[] {
        const conf = state.artifacts.find((artifact) => artifact.path.endsWith('.json'));
        return [
            {
                key: 'Configuration file',
                value: conf.path.split('/').slice(-1)[0],
                download: () => console.log('Downloading artifact', conf.path),
                show: () => {
                    console.log('Showing Artifact', conf.path);
                    this.store.dispatch(openArtifact({ path: conf.path }));
                }
            },
            { key: 'Start Timestamp', value: state.startedUtc },
            { key: 'Stop Criterion', value: 'Population size' },
            { key: 'Status', value: state.finishedUtc ? 'FINISHED' : 'RUNNING' }
        ];
    }

    artifactsToElementList(artifacts: ArtifactInfo[]): ListElement[] {
        return artifacts.map((artifact) => {
            return {
                key: artifact.path.split('/').slice(-1)[0],
                value: `Size ${this.formatBytes(artifact.sizeKb)}`,
                show: () => {
                    console.log('Showing Artifact', artifact.path);
                    this.store.dispatch(openArtifact({ path: artifact.path }));
                }
            };
        });
    }

    formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    ngOnDestroy() {
    }

}
