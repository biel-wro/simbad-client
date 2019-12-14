import * as assert from 'assert';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { ArtifactsEffects } from '@simbad-client/app/features/examples/simulation-pipeline/core/store/artifacts/artifacts.effects';
import { HostService } from '@simbad-host-api/gen';
import { NotificationService } from '@simbad-client/app/core/notifications/notification.service';
import {
    downloadArtifact,
    openArtifact
} from '@simbad-client/app/features/examples/simulation-pipeline/core/store/artifacts/artifacts.actions';
import { cold, hot } from 'jasmine-marbles';
import { StatusService } from '@simbad-cli-api/gen';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse } from '@angular/common/http';


describe('AuthEffects', () => {
    let actions$: Observable<any>;
    let effects: ArtifactsEffects;
    let statusService: StatusService;
    let notificationService: NotificationService;
    let hostService: HostService;
    const scheduler = new TestScheduler((actual, expected) => assert.deepStrictEqual(actual, expected));

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                NoopAnimationsModule
            ],
            providers: [
                ArtifactsEffects,
                StatusService,
                HostService,
                NotificationService,
                provideMockActions(() => actions$),
                provideMockStore({})
            ]
        });

        effects = TestBed.get(ArtifactsEffects);
        statusService = TestBed.get(StatusService);
        notificationService = TestBed.get(NotificationService);
        hostService = TestBed.get(HostService);
    });

    describe('downloadArtifact$', () => {
        beforeEach(() => {
            const artifact = new Blob();
            window.URL.createObjectURL = jest.fn();
            statusService.downloadArtifact = jest.fn().mockReturnValue(of(artifact));
        });

        it('should not dispatch any action', () => {
            // given
            const expected$ = cold('a', { a: undefined });

            // when
            actions$ = hot('a', {
                a: downloadArtifact({ id: 123, name: '123' })
            });

            // then
            expect(effects.downloadArtifact$).toBeObservable(expected$);
        });

        it('should show notification when download starts and finishes', () => {
            scheduler.run(({ flush, expectObservable }) => {
                // given
                notificationService.success = jest.fn();
                notificationService.info = jest.fn();

                // when
                actions$ = scheduler.createHotObservable('a', {
                    a: downloadArtifact({ id: 123, name: '123' })
                });

                // then
                expectObservable(effects.downloadArtifact$).toBe(
                    'a',
                    { a: undefined }
                );
                flush();
                expect(notificationService.info).toHaveBeenCalledWith('123 download started.');
                expect(notificationService.success).toHaveBeenCalledWith('123 download finished.');
            });
        });

        it('should handle error', () => {
            scheduler.run(({ flush, expectObservable }) => {
                // given
                const error: HttpErrorResponse = new HttpErrorResponse({});
                statusService.downloadArtifact = jest.fn().mockReturnValue(throwError(error));
                notificationService.error = jest.fn();

                // when
                actions$ = scheduler.createHotObservable('a', {
                    a: downloadArtifact({ id: 123, name: '123' })
                });

                // then
                expectObservable(effects.downloadArtifact$).toBe(
                    'a',
                    { a: error }
                );
                flush();
                expect(notificationService.error).toHaveBeenCalledWith('Failed to download 123.');
            });
        });
    });

    describe('openArtifact$', () => {
        beforeEach(() => {
            hostService.openLocation = jest.fn().mockReturnValue(of(undefined) as Observable<void>);
        });

        it('should open path in host system', () => {
            // when
            actions$ = hot('a', {
                a: openArtifact({ path: '/some/path' })
            });

            // then
            const expected$ = cold('a', { a: undefined });
            expect(effects.openArtifact$).toBeObservable(expected$);
            expect(hostService.openLocation).toHaveBeenCalled();
        });

        it('should handle error', () => {
            scheduler.run(({ flush, expectObservable }) => {
                // given
                const error: HttpErrorResponse = new HttpErrorResponse({});
                hostService.openLocation = jest.fn().mockReturnValue(throwError(error));
                notificationService.error = jest.fn();

                // when
                actions$ = scheduler.createHotObservable('a', {
                    a: openArtifact({ path: '/some/path' })
                });

                // then
                expectObservable(effects.openArtifact$).toBe(
                    'a',
                    { a: error }
                );
                flush();
                expect(notificationService.error).toHaveBeenCalledWith('Failed to open /some/path.');
            });
        });
    });
});
