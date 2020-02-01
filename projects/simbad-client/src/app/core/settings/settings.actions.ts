import { Action } from '@ngrx/store';

import { Language } from './settings.model';

export enum SettingsActionTypes {
    CHANGE_LANGUAGE = '[Settings] Change Language',
    CHANGE_THEME = '[Settings] Change Theme',
    CHANGE_STICKY_HEADER = '[Settings] Change Sticky Header',
    CHANGE_HOUR = '[Settings] Change Hours'
}

export class ActionSettingsChangeLanguage implements Action {
    readonly type = SettingsActionTypes.CHANGE_LANGUAGE;

    constructor(readonly payload: { language: Language }) {}
}

export class ActionSettingsChangeTheme implements Action {
    readonly type = SettingsActionTypes.CHANGE_THEME;

    constructor(readonly payload: { theme: string }) {}
}


export class ActionSettingsChangeStickyHeader implements Action {
    readonly type = SettingsActionTypes.CHANGE_STICKY_HEADER;

    constructor(readonly payload: { stickyHeader: boolean }) {}
}

export class ActionSettingsChangeHour implements Action {
    readonly type = SettingsActionTypes.CHANGE_HOUR;

    constructor(readonly payload: { hour: number }) {}
}

export type SettingsActions =
    | ActionSettingsChangeLanguage
    | ActionSettingsChangeTheme
    | ActionSettingsChangeStickyHeader
    | ActionSettingsChangeHour;
