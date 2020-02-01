import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from '@simbad-client/app/core/core.module';

import { State } from '../simulationState';

@Component({
    selector: 'simbad-simulation',
    templateUrl: './simulation.component.html',
    styleUrls: ['./simulation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationComponent implements OnInit {
    isAuthenticated$: Observable<boolean>;

    simulation = [
        { link: 'form', label: 'simbad.simulation.menu.form' },
        {
            link: 'simulation-pipeline',
            label: 'simbad.simulation.menu.simulation-pipeline'
        }
    ];

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    }
}
