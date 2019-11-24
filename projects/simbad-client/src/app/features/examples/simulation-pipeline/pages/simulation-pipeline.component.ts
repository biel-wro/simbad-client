import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../simulationState';
import { combineLatest, Observable, Subject } from 'rxjs';
import { selectConfiguration } from '../../configuration-editor/store/form.selectors';
import { filter, map, takeUntil } from 'rxjs/operators';
import { FormsService } from '../../configuration-editor/services/forms.service';
import {
    analyzerStepState,
    cliStepState,
    isSimulationOngoing, reportStepState
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.selectors';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import {
    checkForRunningSimulation, loadLatestSimulation,
    startSimulation
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.actions';

import { isEmpty } from 'lodash';
import { MatHorizontalStepper } from '@angular/material';

@Component({
    selector: 'simbad-client-simulation-pipeline',
    templateUrl: './simulation-pipeline.component.html',
    styleUrls: ['./simulation-pipeline.component.scss']
})
export class SimulationPipelineComponent implements OnInit, OnDestroy {
    configuration$: Observable<any>;
    cliStepInfo$: Observable<SimulationStepInfo>;
    analyzerStepInfo$: Observable<SimulationStepInfo>;
    isCliTaskCompleted$: Observable<boolean>;
    isAnalyzerStepCompleted$: Observable<boolean>;
    isReportStepCompleted$: Observable<boolean>;
    shouldDisableStartButton$: Observable<boolean>;
    isSimulationOngoing$: Observable<boolean>;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

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
            filter((status) => !!status),
        );

        this.cliStepInfo$.pipe(
            takeUntil(this.ngUnsubscribe),
            filter((info) => !!info)
        ).subscribe((info: SimulationStepInfo) => {
            if (info && info.finishedUtc) {
                this.stepper.next();
            }
        });

        this.analyzerStepInfo$ = this.store.pipe(
            select(analyzerStepState),
            filter((status) => !!status),
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

        this.analyzerStepInfo$.pipe(
            takeUntil(this.ngUnsubscribe),
            filter((info) => !!info)
        ).subscribe((info: SimulationStepInfo) => {
            if (info && info.finishedUtc) {
                this.stepper.next();
            }
        });

        this.isCliTaskCompleted$ = this.store.pipe(
            select(cliStepState),
            filter((info) => !!info),
            map((value) => !!value.finishedUtc)
        );

        this.store.dispatch(checkForRunningSimulation());
    }

    ngOnDestroy(): void {

    }

    sendToCli(conf: any): void {
        this.store.dispatch(startSimulation({ request: { configuration: conf.value, configurationName: conf.name } }));
    }

    loadLatestSimulation(): void {
        this.store.dispatch(loadLatestSimulation());
    }
}
