import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    analyzerStepEndTimestamp,
    analyzerStepStartTimestamp,
    analyzerStepState
} from '../../../core/store/simulation/simulation-pipeline.selectors';
import { filter, map, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '../../common/info-list/info-list.component';
import { downloadArtifact } from '../../../core/store/simulation/simulation-pipeline.actions';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { AnalyzerRuntimeInfo } from '@simbad-cli-api/gen/models/analyzer-runtime-info';

@Component({
    selector: 'simbad-client-analyzer-step',
    templateUrl: './analyzer-step.component.html',
    styleUrls: ['./analyzer-step.component.scss']
})
export class AnalyzerStepComponent implements OnInit, OnDestroy {
    runtimeInfo$: Observable<AnalyzerRuntimeInfo>;
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
            select(analyzerStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => status.analyzerRuntimeInfo)
        );

        this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(analyzerStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => !!status.finishedUtc)
        ).subscribe((finished: boolean) => {
            if (finished) this.stopTimer$.next();
        });

        this.taskContext$ = this.store.pipe(
            select(analyzerStepState),
            filter((state) => !!state),
            map((state) => this.buildTaskContextFromAnalyzerState(state))
        );

        this.timer$ = timer(0, 1000).pipe(
            takeUntil(this.stopTimer$)
        );

        this.elapsedTime$ = combineLatest([
            this.store.select(analyzerStepStartTimestamp).pipe(filter((time) => !!time)),
            this.store.select(analyzerStepEndTimestamp),
            this.timer$
        ]).pipe(
            map(([startTimestamp, endTimestamp]) => {
                return this.timeToTimeString(startTimestamp, endTimestamp);
            })
        );

        this.artifactList$ = this.store.pipe(
            select(analyzerStepState),
            filter((state) => !!state),
            map((state) => state.artifacts.filter((artifact) => !artifact.path.endsWith('.json'))),
            map((artifacts) => this.artifactsToElementList(artifacts))
        );

    }

    timeToTimeString(startTimestamp: string, endTimestamp?: string) {
        const now = Date.now();
        const start = Date.parse(startTimestamp);
        const diff = endTimestamp ? Date.parse(endTimestamp) - start :  now - start;
        return new Date(diff).toISOString().substr(11, 8);
    }

    buildTaskContextFromAnalyzerState(state: SimulationStepInfo): ListElement[] {
        return [
            {
                key: 'Dashboard',
                value: 'Spark UI',
                redirect: () => {
                    console.log('Opening Spark UI...');
                    const url = 'http://localhost:4040/stages/';
                    window.open(url, '_blank');
                }
            },
            { key: 'Status', value: state.finishedUtc ? 'FINISHED' : 'RUNNING' }
        ];
    }

    artifactsToElementList(artifacts: ArtifactInfo[]): ListElement[] {
        return artifacts.map((artifact) => {
            return {
                key: artifact.path.split('/').slice(-1)[0],
                value: `Size ${this.formatBytes(artifact.sizeKb)}`,
                download: () => {
                    this.store.dispatch(downloadArtifact({
                        id: artifact.id,
                        name: artifact.path.split('/').slice(-1)[0]
                    }));
                    return console.log('Downloading artifact', artifact.id);
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
