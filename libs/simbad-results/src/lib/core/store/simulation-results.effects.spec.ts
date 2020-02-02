import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SimulationResultsEffects } from './simulation-results.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';

describe('SimulationResultsEffects', () => {
    // let actions$: Observable<any>;
    let effects: SimulationResultsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SimulationResultsEffects,
                provideMockActions(() => actions$),
                {
                    provide: NotificationService,
                    useValue: {
                        info: () => {}
                    }
                }
            ],
            imports: [HttpClientTestingModule, SharedModule]
        });

        effects = TestBed.get(SimulationResultsEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
