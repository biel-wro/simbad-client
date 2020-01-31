import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    reportStepArtifacts,
    reportStepEndTimestamp,
    reportStepStartTimestamp,
    reportStepState
} from '../../../core/store/simulation/simulation-pipeline.selectors';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '../../common/info-list/info-list.component';
import { AnalyzerRuntimeInfo } from '@simbad-cli-api/gen/models/analyzer-runtime-info';
import { timeToTimeString } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/time-utils';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { downloadArtifact } from '@simbad-client/app/features/examples/simulation-pipeline/core/store/artifacts/artifacts.actions';

@Component({
    selector: 'simbad-client-report-step',
    templateUrl: './report-step.component.html',
    styleUrls: ['./report-step.component.scss']
})
export class ReportStepComponent implements OnInit, OnDestroy {
    runtimeInfo$: Observable<AnalyzerRuntimeInfo>;
    artifacts$: Observable<ArtifactInfo[]>;
    simulationReport$: Observable<ArtifactInfo>;
    elapsedTime$: Observable<string>;
    taskContext$: Observable<ListElement[]>;
    simulationId$: Observable<number>;
    isFinished$: Observable<boolean>;

    timer$: Observable<number>;
    stopTimer$: Subject<void> = new Subject<void>();
    ngUnsubscribe$: Subject<void> = new Subject();


    constructor(
        private store: Store<{}>
    ) {
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

        this.simulationId$ = this.store.pipe(
            select(reportStepState),
            filter((state) => !!state),
            map((state) => state.simulationId)
        );

        this.isFinished$ = this.store.pipe(
            select(reportStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => !!status.finishedUtc)
        );


        this.elapsedTime$ = combineLatest([
            this.store.select(reportStepStartTimestamp).pipe(filter((time) => !!time)),
            this.store.select(reportStepEndTimestamp),
            this.timer$
        ]).pipe(
            map(([startTimestamp, endTimestamp]) => {
                return timeToTimeString(startTimestamp, endTimestamp);
            })
        );

        this.artifacts$ = this.store.select(reportStepArtifacts);

        this.simulationReport$ = this.store.pipe(
            select(reportStepState),
            filter((state) => !!state),
            map((state) => state.artifacts),
            map((artifacts) => artifacts.find((artifact) => artifact.fileType === 'PDF'))
        );

    }

    buildTaskContextFromAnalyzerState(state: SimulationStepInfo): ListElement[] {
        return [
            { key: 'Status', value: state.status }
        ];
    }

    goToModelViewer(simulationId: number): void {
        console.log('Opening Spark UI...');
        const url = `http://localhost:8080/viewer/?r=${simulationId}`;
        window.open(url, '_blank');
    }

    downloadReport(report: ArtifactInfo): void {
        const { name, id } = report;
        this.store.dispatch(downloadArtifact({ name, id }));
    }

    ngOnDestroy() {
    }

}
