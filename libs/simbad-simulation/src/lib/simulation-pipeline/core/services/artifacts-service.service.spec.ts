import { TestBed } from '@angular/core/testing';

import { ArtifactsActionsService } from './artifacts-actions.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('ArtifactsActionsService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState: {} })]
        })
    );

    it('should be created', () => {
        const service: ArtifactsActionsService = TestBed.get(ArtifactsActionsService);
        expect(service).toBeTruthy();
    });
});
