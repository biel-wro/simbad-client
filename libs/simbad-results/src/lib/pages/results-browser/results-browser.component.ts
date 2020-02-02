import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSimulationResultsRequest } from '@simbad-results/lib/core/store/simulation-results.actions';
import { Observable } from 'rxjs';
import { SimulationSimpleInfo } from '@simbad-cli-api/gen/models/simulation-simple-info';
import { selectAllSimulationResults } from '@simbad-results/lib/core/store/simulation-results.selectors';

@Component({
    selector: 'simbad-results-browser',
    templateUrl: './results-browser.component.html',
    styleUrls: ['./results-browser.component.scss']
})
export class ResultsBrowserComponent implements OnInit {
    simulationResults$: Observable<SimulationSimpleInfo[]>;
    constructor(private store: Store<{}>) {}

    ngOnInit() {
        this.store.dispatch(loadSimulationResultsRequest({}));
        this.simulationResults$ = this.store.select(selectAllSimulationResults);
    }
}
