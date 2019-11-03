import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../simulationState';
import { combineLatest, Observable } from 'rxjs';
import { selectConfiguration } from '../../configuration-editor/store/form.selectors';
import { filter, map } from 'rxjs/operators';
import { FormsService } from '../../configuration-editor/services/forms.service';
import { MatVerticalStepper } from '@angular/material';
import {
    cliStepState,
    isSimulationOngoing
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.selectors';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import {
    checkForRunningSimulation,
    startSimulation
} from '@simbad-client/app/features/examples/simulation-pipeline/pages/store/simulation-pipeline.actions';

import { isEmpty } from 'lodash';

@Component({
    selector: 'simbad-client-simulation-pipeline',
    templateUrl: './simulation-pipeline.component.html',
    styleUrls: ['./simulation-pipeline.component.scss']
})
export class SimulationPipelineComponent implements OnInit, OnDestroy {
    configuration$: Observable<any>;
    cliStepInfo$: Observable<SimulationStepInfo>;
    isCliTaskCompleted$: Observable<boolean>;
    shouldDisableStartButton$: Observable<boolean>;
    isSimulationOngoing$: Observable<boolean>;

    @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

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

        this.isCliTaskCompleted$ = this.store.pipe(
            select(cliStepState),
            map((value) => !!value.finishedUtc)
        );

        this.store.dispatch(checkForRunningSimulation());
    }

    ngOnDestroy(): void {

    }

    sendToCli(conf: any): void {
        this.store.dispatch(startSimulation({ request: { configuration: conf.value, configurationName: conf.name } }));
    }
}
