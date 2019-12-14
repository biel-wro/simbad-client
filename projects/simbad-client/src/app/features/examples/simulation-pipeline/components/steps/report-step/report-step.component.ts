import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    reportStepEndTimestamp,
    reportStepStartTimestamp,
    reportStepState
} from '../../../core/store/simulation/simulation-pipeline.selectors';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { SimulationStepInfo } from '@simbad-cli-api/gen/models/simulation-step-info';
import { ListElement } from '../../common/info-list/info-list.component';
import { downloadArtifact } from '../../../core/store/simulation/simulation-pipeline.actions';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { AnalyzerRuntimeInfo } from '@simbad-cli-api/gen/models/analyzer-runtime-info';
import { StatusService } from '@simbad-cli-api/gen';
import { MatDialog } from '@angular/material';
import { ImagePreviewDialogComponent } from '../../common/image-preview-dialog/image-preview-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'simbad-client-report-step',
    templateUrl: './report-step.component.html',
    styleUrls: ['./report-step.component.scss']
})
export class ReportStepComponent implements OnInit, OnDestroy {
    runtimeInfo$: Observable<AnalyzerRuntimeInfo>;
    artifactList$: Observable<ListElement[]>;
    elapsedTime$: Observable<string>;
    taskContext$: Observable<ListElement[]>;

    timer$: Observable<number>;
    stopTimer$: Subject<void> = new Subject<void>();
    ngUnsubscribe$: Subject<void> = new Subject();


    constructor(
        private store: Store<{}>,
        private statusService: StatusService,
        private dialog: MatDialog,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.runtimeInfo$ = this.store.pipe(
            select(reportStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => status.analyzerRuntimeInfo)
        );

        this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(reportStepState),
            filter((status: SimulationStepInfo) => !!status),
            map((status) => !!status.finishedUtc)
        ).subscribe((finished: boolean) => {
            if (finished) this.stopTimer$.next();
        });

        this.taskContext$ = this.store.pipe(
            select(reportStepState),
            filter((state) => !!state),
            map((state) => this.buildTaskContextFromAnalyzerState(state))
        );

        this.timer$ = timer(0, 1000).pipe(
            takeUntil(this.stopTimer$)
        );


        this.elapsedTime$ = combineLatest([
            this.store.select(reportStepStartTimestamp).pipe(filter((time) => !!time)),
            this.store.select(reportStepEndTimestamp),
            this.timer$
        ]).pipe(
            map(([startTimestamp, endTimestamp]) => {
                return this.timeToTimeString(startTimestamp, endTimestamp);
            })
        );

        this.artifactList$ = this.store.pipe(
            select(reportStepState),
            filter((state) => !!state),
            map((state) => state.artifacts.filter((artifact) => !artifact.path.endsWith('.json'))),
            map((artifacts) => this.artifactsToElementList(artifacts))
        );

    }

    timeToTimeString(startTimestamp: string, endTimestamp?: string) {
        const now = Date.now();
        const start = Date.parse(startTimestamp);
        const diff = endTimestamp ? Date.parse(endTimestamp) - start : now - start;
        return new Date(diff).toISOString().substr(11, 8);
    }

    buildTaskContextFromAnalyzerState(state: SimulationStepInfo): ListElement[] {
        return [
            { key: 'Status', value: state.finishedUtc ? 'FINISHED' : 'RUNNING' }
        ];
    }

    artifactsToElementList(artifacts: ArtifactInfo[]): ListElement[] {
        return artifacts.map((artifact) => {
            return {
                key: artifact.path.split('/').slice(-1)[0],
                value: `Size ${this.formatBytes(artifact.sizeKb)}`,
                download: () => {
                    this.store.dispatch(downloadArtifact({
                        id: artifact.id,
                        name: artifact.path.split('/').slice(-1)[0]
                    }));
                    return console.log('Downloading artifact', artifact.id);
                },
                preview: () => {
                    this.statusService.downloadArtifact({ id: artifact.id }).pipe(
                        take(1)
                    ).subscribe((response) => {
                        const objectURL = URL.createObjectURL(response);
                        const image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        const name = artifact.path.split('/').slice(-1)[0];
                        this.dialog.open(
                            ImagePreviewDialogComponent,
                            {
                                data: { image, name },
                            }
                        );
                        return console.log('Showing artifact', artifact.id);
                    });
                }
            };
        });
    }

    formatBytes(bytes: number, decimals = 2): string {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    ngOnDestroy() {
    }

}
