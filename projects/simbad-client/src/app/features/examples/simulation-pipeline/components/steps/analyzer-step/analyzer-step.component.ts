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
import { AnalyzerRuntimeInfo } from '@simbad-cli-api/gen/models/analyzer-runtime-info';
import { timeToTimeString } from '@simbad-client/app/features/examples/simulation-pipeline/core/functions/time-utils';
import { ArtifactsActionsService } from '@simbad-client/app/features/examples/simulation-pipeline/core/services/artifacts-actions.service';
import { ArtifactActionType } from '@simbad-client/app/features/examples/simulation-pipeline/core/models';

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


    constructor(private store: Store<{}>, private as: ArtifactsActionsService) {
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
                return timeToTimeString(startTimestamp, endTimestamp);
            })
        );

        this.artifactList$ = this.store.pipe(
            select(analyzerStepState),
            filter((state) => !!state),
            map((state) => state.artifacts.filter((artifact) => artifact.fileType !== 'JSON')),
            map((artifacts) => this.as.artifactsToElementList(
                artifacts, [ArtifactActionType.Download]))
        );

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

    ngOnDestroy() {
    }

}
