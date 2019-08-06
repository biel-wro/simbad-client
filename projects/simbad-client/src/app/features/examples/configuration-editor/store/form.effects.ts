import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../../core/core.module';

import { actionFormUpdate, actionFormUpdateRootObjects } from './form.actions';

export const FORM_KEY = 'CONF.FORM';
export const FORM_ROOT_OB = 'CONF.FORM.ROOT_OBJ';

@Injectable()
export class FormEffects {
    persistForm$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actionFormUpdate),
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
                ofType(actionFormUpdateRootObjects),
                tap(action =>
                    this.localStorageService.setItem(FORM_ROOT_OB, {
                        form: action.rootObjectClassNames
                    })
                )
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private localStorageService: LocalStorageService) {}
}
