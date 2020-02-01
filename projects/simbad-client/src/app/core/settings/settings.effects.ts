import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { interval, merge, of } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, tap, withLatestFrom } from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TitleService } from '../title/title.service';

import { ActionSettingsChangeHour, SettingsActions, SettingsActionTypes } from './settings.actions';
import { selectEffectiveTheme, selectSettingsLanguage } from './settings.selectors';
import { State } from './settings.model';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('simbad-init-effect-trigger');

@Injectable()
export class SettingsEffects {
    constructor(
        private actions$: Actions<SettingsActions>,
        private store: Store<State>,
        private router: Router,
        private overlayContainer: OverlayContainer,
        private localStorageService: LocalStorageService,
        private titleService: TitleService,
        private translateService: TranslateService
    ) {}

    @Effect()
    changeHour = interval(60_000).pipe(
        mapTo(new Date().getHours()),
        distinctUntilChanged(),
        map(hour => new ActionSettingsChangeHour({ hour }))
    );

    @Effect({ dispatch: false })
    persistSettings = this.actions$.pipe(
        ofType(
            SettingsActionTypes.CHANGE_LANGUAGE,
            SettingsActionTypes.CHANGE_STICKY_HEADER,
            SettingsActionTypes.CHANGE_THEME
        ),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings))
    );

    @Effect({ dispatch: false })
    updateTheme = merge(INIT, this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_THEME))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {
            const classList = this.overlayContainer.getContainerElement().classList;
            const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
            if (toRemove.length) {
                classList.remove(...toRemove);
            }
            classList.add(effectiveTheme);
        })
    );

    @Effect({ dispatch: false })
    setTranslateServiceLanguage = this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap(language => this.translateService.use(language))
    );

    @Effect({ dispatch: false })
    setTitle = merge(
        this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_LANGUAGE)),
        this.router.events.pipe(filter(event => event instanceof ActivationEnd))
    ).pipe(
        tap(() => {
            this.titleService.setTitle(this.router.routerState.snapshot.root, this.translateService);
        })
    );
}
