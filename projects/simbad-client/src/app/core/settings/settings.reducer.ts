import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import { SettingsActions, SettingsActionTypes } from './settings.actions';

export const initialState: SettingsState = {
    language: 'en',
    theme: 'BLACK-THEME',
    nightTheme: NIGHT_MODE_THEME,
    stickyHeader: true,
    hour: 0
};

export function settingsReducer(state: SettingsState = initialState, action: SettingsActions): SettingsState {
    switch (action.type) {
        case SettingsActionTypes.CHANGE_LANGUAGE:
        case SettingsActionTypes.CHANGE_THEME:
        case SettingsActionTypes.CHANGE_STICKY_HEADER:
        case SettingsActionTypes.CHANGE_HOUR:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
