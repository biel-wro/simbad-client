import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'simbad-client-cli-step',
    templateUrl: './cli-step.component.html',
    styleUrls: ['./cli-step.component.scss']
})
export class CliStepComponent implements OnInit, OnDestroy {

    constructor(private store: Store<{}>) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
