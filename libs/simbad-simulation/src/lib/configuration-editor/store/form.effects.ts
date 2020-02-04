import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, tap } from 'rxjs/operators';

import { LocalStorageService, NotificationService } from '@simbad-client/app/core/core.module';

import {
    loadConfiguration,
    resetFormValue,
    updateConfigurationName,
    updateFormRootObjects,
    updateFormValue
} from './form.actions';
import { FormsService } from '@simbad-simulation/lib/configuration-editor/services/forms.service';

export const FORM_KEY = 'CONF.FORM';
export const FORM_ROOT_OB = 'CONF.FORM.ROOT_OBJ';

@Injectable()
export class FormEffects {
    persistForm$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateFormValue),
                tap(action =>
                    this.localStorageService.setItem(FORM_KEY, {
                        form: action.formValue
                    })
                )
            ),
        { dispatch: false }
    );

    persistRootObjects$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateFormRootObjects),
                tap(action =>
                    this.localStorageService.setItem(FORM_ROOT_OB, {
                        form: action.rootObjectClassNames
                    })
                )
            ),
        { dispatch: false }
    );

    loadConfiguration$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadConfiguration),
            tap(({ name }) => {
                this.ns.info(`Uploaded configuration ${name}. The original file was not changed`, 3000);
            }),
            concatMap(({ configuration, name }) => {
                const rootObjectClassNames = Object.keys(configuration);
                const formValue = this.fs.configurationToFormValue(configuration);
                return [
                    resetFormValue(),
                    updateFormRootObjects({ rootObjectClassNames }),
                    updateFormValue({ formValue }),
                    updateConfigurationName({ configurationName: name })
                ];
            })
        );
    });

    constructor(
        private actions$: Actions,
        private localStorageService: LocalStorageService,
        private fs: FormsService,
        private ns: NotificationService
    ) {}
}
