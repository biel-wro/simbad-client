import { AppState } from '../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export type Language = 'en' | 'sk' | 'de' | 'fr' | 'es' | 'pt-br' | 'he';

export interface SettingsState {
    language: string;
    theme: string;
    nightTheme: string;
    stickyHeader: boolean;
    hour: number;
}

export interface State extends AppState {
    settings: SettingsState;
}
