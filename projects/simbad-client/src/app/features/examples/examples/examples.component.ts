import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

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
    { link: 'todos', label: 'simbad.examples.menu.todos' },
    { link: 'stock-market', label: 'simbad.examples.menu.stocks' },
    { link: 'theming', label: 'simbad.examples.menu.theming' },
    { link: 'crud', label: 'simbad.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'simbad.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'simbad.examples.menu.form' },
    { link: 'notifications', label: 'simbad.examples.menu.notifications' },
    { link: 'authenticated', label: 'simbad.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
