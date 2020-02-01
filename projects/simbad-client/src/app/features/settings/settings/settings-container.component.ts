import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActionSettingsChangeLanguage, ActionSettingsChangeTheme } from '../../../core/settings/settings.actions';
import { SettingsState, State } from '../../../core/settings/settings.model';
import { selectSettings } from '../../../core/settings/settings.selectors';

@Component({
    selector: 'simbad-settings',
    templateUrl: './settings-container.component.html',
    styleUrls: ['./settings-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsContainerComponent implements OnInit {
    settings$: Observable<SettingsState>;

    themes = [
        { value: 'DEFAULT-THEME', label: 'blue' },
        { value: 'LIGHT-THEME', label: 'light' },
        { value: 'NATURE-THEME', label: 'nature' },
        { value: 'BLACK-THEME', label: 'dark' }
    ];

    languages = [{ value: 'en', label: 'en' }];

    constructor(private store: Store<State>) {}

    ngOnInit() {
        this.settings$ = this.store.pipe(select(selectSettings));
    }

    onLanguageSelect({ value: language }) {
        this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    }

    onThemeSelect({ value: theme }) {
        this.store.dispatch(new ActionSettingsChangeTheme({ theme }));
    }
}
