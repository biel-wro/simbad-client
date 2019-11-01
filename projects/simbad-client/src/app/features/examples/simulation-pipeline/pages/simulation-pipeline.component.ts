import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CliService } from '@simbad-cli-api/gen';
import { select, Store } from '@ngrx/store';
import { State } from '../../simulationState';
import { Observable } from 'rxjs';
import { selectConfiguration } from '../../configuration-editor/store/form.selectors';
import { filter, map } from 'rxjs/operators';
import { FormsService } from '../../configuration-editor/services/forms.service';
import { selectCliTaskStatus } from '../cli-step/store/cli-step.selectors';
import {
    checkForRunningCliTask, openArtifact, startCliTask,
    stopPollingForTaskStatusChange
} from '../cli-step/store/cli-step.actions';
import { MatVerticalStepper } from '@angular/material';
import { CliTaskStatus } from '@simbad-cli-api/gen/models/cli-task-status';

@Component({
    selector: 'simbad-client-simulation-pipeline',
    templateUrl: './simulation-pipeline.component.html',
    styleUrls: ['./simulation-pipeline.component.scss']
})
export class SimulationPipelineComponent implements OnInit, OnDestroy {
    configuration: Observable<any>;
    cliTaskStatus$: Observable<CliTaskStatus>;
    isCliTaskCompleted$: Observable<boolean>;

    @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

    constructor(private api: CliService, private store: Store<State>, private fs: FormsService) {
    }

    ngOnInit() {
        this.configuration = this.store.pipe(
            select(selectConfiguration),
            filter(configuration => !!configuration.formValue),
            map(({ formValue, name }) => {
                return {
                    value: this.fs.formValueToConfiguration(formValue),
                    name
                };
            })
        );


        this.cliTaskStatus$ = this.store.pipe(
            select(selectCliTaskStatus),
            filter((status) => !!status)
        );

        this.isCliTaskCompleted$ = this.store.pipe(
            select(selectCliTaskStatus),
            filter((value => !!value)),
            map((value) => !!value.result)
        );

        this.store.dispatch(checkForRunningCliTask());


    }

    ngOnDestroy(): void {
        this.store.dispatch(stopPollingForTaskStatusChange());
    }

    sendToCli(conf: any): void {
        console.log('Sending conf...', conf);
        this.store.dispatch(startCliTask({request: {configuration: conf.value, configurationName: conf.name}}));
    }

    openFile(): void {
        const path = '/home/jakub/Downloads/KEKW';
        this.store.dispatch(openArtifact({path}));
    }
}
