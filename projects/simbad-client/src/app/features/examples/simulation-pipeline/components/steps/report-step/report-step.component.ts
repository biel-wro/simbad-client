import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    analyzerStepState,
    reportStepEndTimestamp,
    reportStepStartTimestamp,
    reportStepState
} from '../../../core/store/simulation/simulation-pipeline.selectors';
import { filter, map, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '../../common/info-list/info-list.component';
import { AnalyzerRuntimeInfo } from '@simbad-cli-api/gen/models/analyzer-runtime-info';
import { timeToTimeString } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/time-utils';
import { ArtifactsActionsService } from '@simbad-client/app/features/examples/simulation-pipeline/core/services/artifacts-actions.service';
import { ArtifactActionType } from '@simbad-client/app/features/examples/simulation-pipeline/core/models';
import { extractFilename } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/path-utils';

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
    simulationId$: Observable<number>;
    isFinished$: Observable<boolean>;

    timer$: Observable<number>;
    stopTimer$: Subject<void> = new Subject<void>();
    ngUnsubscribe$: Subject<void> = new Subject();


    constructor(
        private store: Store<{}>,
        private artifactsService: ArtifactsActionsService
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

        this.artifactList$ = this.store.pipe(
            select(reportStepState),
            filter((state) => !!state),
            map((state) => {
                return state.artifacts
                    .filter((artifact) => !artifact.path.endsWith('.json'))
                    .sort((a, b) => {
                        if (a.id === b.id) return 0;
                        return extractFilename(a.path) > extractFilename(b.path) ? 1 : -1;
                    });
            }),
            map((artifacts) => {
                return this.artifactsService.artifactsToElementList(
                    artifacts,
                    [ArtifactActionType.Download, ArtifactActionType.Preview]
                );
            })
        );

    }

    buildTaskContextFromAnalyzerState(state: SimulationStepInfo): ListElement[] {
        return [
            { key: 'Status', value: state.finishedUtc ? 'FINISHED' : 'RUNNING' }
        ];
    }

    goToModelViewer(simulationId: number): void {
        console.log('Opening Spark UI...');
        const url = `http://localhost:8080/viewer/?r=${simulationId}`;
        window.open(url, '_blank');
    }

    ngOnDestroy() {
    }

}
