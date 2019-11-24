import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { reportStepStartTimestamp, reportStepState } from '../../../pages/store/simulation-pipeline.selectors';
import { filter, map, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '../../common/info-list/info-list.component';
import { downloadArtifact } from '../../../pages/store/simulation-pipeline.actions';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { AnalyzerRuntimeInfo } from '@simbad-cli-api/gen/models/analyzer-runtime-info';

@Component({
    selector: 'simbad-client-report-step',
    templateUrl: './report-step.component.html',
    styleUrls: ['./report-step.component.scss']
})
export class ReportStepComponent implements OnInit, OnDestroy {
    runtimeInfo$: Observable<AnalyzerRuntimeInfo>;
    artifactList$: Observable<ListElement[]>;
    elapsedTime$: Observable<string>;
    taskContext$: Observable<ListElement[]>;

    timer$: Observable<number>;
    stopTimer$: Subject<void> = new Subject<void>();
    ngUnsubscribe$: Subject<void> = new Subject();


    constructor(private store: Store<{}>) {
    }

    ngOnInit() {
        this.runtimeInfo$ = this.store.pipe(
            select(reportStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => status.analyzerRuntimeInfo)
        );

        this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(reportStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => !!status.finishedUtc)
        ).subscribe((finished: boolean) => {
            if (finished) this.stopTimer$.next();
        });

        this.taskContext$ = this.store.pipe(
            select(reportStepState),
            filter((state) => !!state),
            map((state) => this.buildTaskContextFromAnalyzerState(state))
        );

        this.timer$ = timer(0, 1000).pipe(
            takeUntil(this.stopTimer$)
        );

        this.elapsedTime$ = combineLatest([
            this.store.select(reportStepStartTimestamp).pipe(filter((time) => !!time)),
            this.timer$
        ]).pipe(
            map(([timestamp, tick]) => {
                return this.timeToTimeString(timestamp);
            })
        );

        this.artifactList$ = this.store.pipe(
            select(reportStepState),
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

    buildTaskContextFromAnalyzerState(state: SimulationStepInfo): ListElement[] {
        return [
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
                },
                preview: () => {
                    return console.log('Showing artifact', artifact.id);
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
