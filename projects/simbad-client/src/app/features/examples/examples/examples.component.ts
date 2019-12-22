import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { routeAnimations, selectIsAuthenticated } from '../../../core/core.module';

import { State } from '../simulationState';

@Component({
    selector: 'simbad-examples',
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss'],
    animations: [routeAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
    isAuthenticated$: Observable<boolean>;

    examples = [
        { link: 'form', label: 'simbad.examples.menu.form' },
        {
            link: 'simulation-pipeline',
            label: 'simbad.examples.menu.simulation-pipeline'
        }
    ];

    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    }
}
