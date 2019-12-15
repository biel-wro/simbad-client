import { TestBed } from '@angular/core/testing';

import { ArtifactsActionsService } from './artifacts-actions.service';

describe('ArtifactsActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtifactsActionsService = TestBed.get(ArtifactsActionsService);
    expect(service).toBeTruthy();
  });
});
