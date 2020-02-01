import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import {
    ActionSettingsChangeLanguage,
    AppState,
    authLogin,
    authLogout,
    LocalStorageService,
    selectEffectiveTheme,
    selectIsAuthenticated,
    selectSettingsLanguage,
    selectSettingsStickyHeader
} from '../core/core.module';

@Component({
    selector: 'simbad-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    isProd = env.production;
    envName = 'test';
    version = '1.2.3';
    year = new Date().getFullYear();
    languages = ['en'];
    navigation = [
        { link: 'about', label: 'simbad.menu.about' },
        { link: 'simulation', label: 'simbad.menu.simulation' }
    ];
    navigationSideMenu = [...this.navigation, { link: 'settings', label: 'simbad.menu.settings' }];

    isAuthenticated$: Observable<boolean>;
    stickyHeader$: Observable<boolean>;
    language$: Observable<string>;
    theme$: Observable<string>;

    constructor(private store: Store<AppState>, private storageService: LocalStorageService) {}

    ngOnInit(): void {
        this.storageService.testLocalStorage();

        this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
        this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
        this.language$ = this.store.pipe(select(selectSettingsLanguage));
        this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    }

    onLoginClick() {
        this.store.dispatch(authLogin());
    }

    onLogoutClick() {
        this.store.dispatch(authLogout());
    }

    onLanguageSelect({ value: language }) {
        this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    }
}
