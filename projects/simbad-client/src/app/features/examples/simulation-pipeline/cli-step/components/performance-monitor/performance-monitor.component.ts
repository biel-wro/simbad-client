import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { CliTaskStatus } from '@simbad-cli-api/gen/models/cli-task-status';
import { select, Store } from '@ngrx/store';
import { filter, map, take, tap } from 'rxjs/operators';
import {
    selectCliTaskStatus, selectElapsedTime,
    selectStartTimestamp
} from '@simbad-client/app/features/examples/simulation-pipeline/cli-step/store/cli-step.selectors';

@Component({
    selector: 'simbad-performance-monitor',
    templateUrl: './performance-monitor.component.html',
    styleUrls: ['./performance-monitor.component.scss']
})
export class PerformanceMonitorComponent implements OnInit {
    taskStatus$: Observable<CliTaskStatus>;
    elapsedTime$: Observable<string>;

    constructor(private store: Store<{}>) {
    }

    ngOnInit() {
        this.taskStatus$ = this.store.pipe(
            select(selectCliTaskStatus),
            filter((status: CliTaskStatus) => !!status)
        );

        this.elapsedTime$ = this.store.pipe(
            select(selectElapsedTime),
            map(this.timeToTimeString),
            tap((value) => console.log('ElapsedTime: ', value))
        );
    }

    timeToTimeString(time: number) {
        return new Date(time).toISOString().substr(11, 8);
    }

}
