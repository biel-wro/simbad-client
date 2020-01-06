import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../simulationState';
import { combineLatest, Observable, Subject } from 'rxjs';
import { selectConfiguration } from '../../configuration-editor/store/form.selectors';
import { distinctUntilChanged, filter, map, startWith, tap } from 'rxjs/operators';
import { FormsService } from '../../configuration-editor/services/forms.service';
import {
    analyzerStepState, analyzerStepStatus,
    cliStepState, cliStepStatus,
    isSimulationOngoing,
    reportStepState, reportStepStatus
} from '@simbad-client/app/features/examples/simulation-pipeline/core/store/simulation/simulation-pipeline.selectors';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import {
    checkForRunningSimulation,
    loadLatestSimulation,
    startSimulation
} from '@simbad-client/app/features/examples/simulation-pipeline/core/store/simulation/simulation-pipeline.actions';

import { isEmpty, isEqual } from 'lodash';

export interface IconModel {
    spin?: boolean;
    pulse?: boolean;
    icon: string;
}

export interface ProgressStatus {
    isCliStepCompleted: boolean;
    isAnalyzerStepCompleted: boolean;
    isReportStepCompleted: boolean;
}

@Component({
    selector: 'simbad-client-simulation-pipeline',
    templateUrl: './simulation-pipeline.component.html',
    styleUrls: ['./simulation-pipeline.component.scss']
})
export class SimulationPipelineComponent implements OnInit, OnDestroy {
    configuration$: Observable<any>;
    cliStepInfo$: Observable<SimulationStepInfo>;
    analyzerStepInfo$: Observable<SimulationStepInfo>;
    isCliStepCompleted$: Observable<boolean>;
    isAnalyzerStepCompleted$: Observable<boolean>;
    isReportStepCompleted$: Observable<boolean>;
    cliStepStatus$: Observable<string>;
    analyzerStepStatus$: Observable<string>;
    reportStepStatus$: Observable<string>;

    iconModels$: Observable<IconModel[]>;
    shouldDisableStartButton$: Observable<boolean>;
    isSimulationOngoing$: Observable<boolean>;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private store: Store<State>, private fs: FormsService) {
    }

    ngOnInit() {
        this.configuration$ = this.store.pipe(
            select(selectConfiguration),
            filter(configuration => !!configuration.formValue),
            map(({ formValue, name }) => {
                return {
                    value: this.fs.formValueToConfiguration(formValue),
                    name
                };
            })
        );

        this.isSimulationOngoing$ = this.store.select(isSimulationOngoing);

        this.shouldDisableStartButton$ = combineLatest([
            this.configuration$,
            this.isSimulationOngoing$
        ]).pipe(
            map(([conf, ongoing]) => {
                return isEmpty(conf.value) || ongoing;
            })
        );

        this.cliStepInfo$ = this.store.pipe(
            select(cliStepState),
            filter((status) => !!status)
        );

        this.analyzerStepInfo$ = this.store.pipe(
            select(analyzerStepState),
            filter((status) => !!status)
        );

        this.isAnalyzerStepCompleted$ = this.store.pipe(
            select(analyzerStepState),
            filter((info) => !!info),
            map((value) => !!value.finishedUtc)
        );

        this.isReportStepCompleted$ = this.store.pipe(
            select(reportStepState),
            filter((info) => !!info),
            map((value) => !!value.finishedUtc)
        );

        this.cliStepStatus$ = this.store.select(cliStepStatus);
        this.analyzerStepStatus$ = this.store.select(analyzerStepStatus);
        this.reportStepStatus$ = this.store.select(reportStepStatus);

        this.isCliStepCompleted$ = this.store.pipe(
            select(cliStepState),
            filter((info) => !!info),
            map((value) => !!value.finishedUtc)
        );

        this.iconModels$ = combineLatest([
            this.cliStepStatus$,
            this.analyzerStepStatus$,
            this.reportStepStatus$
        ]).pipe(
            startWith(['PENDING', 'PENDING', 'PENDING']),
            map((statuses) => statuses.map(this.buildIconForStep))
        );

        this.store.dispatch(checkForRunningSimulation());
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
    }

    sendToCli(conf: any): void {
        this.store.dispatch(startSimulation({ request: { configuration: conf.value, configurationName: conf.name } }));
    }

    loadLatestSimulation(): void {
        this.store.dispatch(loadLatestSimulation());
    }

    buildIconForStep(status: string): IconModel {
        return {
            ['SUCCESS']: { icon: 'check' },
            ['ONGOING']: { icon: 'spinner', spin: true, pulse: true },
            ['PENDING']: { icon: 'ellipsis-h' },
        } [status] || { icon: 'ellipsis-h' };
    }
}
