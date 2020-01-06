import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactListComponent } from './artifact-list.component';
import {
    MatDividerModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { MockComponent, MockPipe } from 'ng-mocks';
import { SmallInputActionComponent } from '@simbad-client/app/shared/small-input-action/small-input-action.component';
import { TranslateModule } from '@ngx-translate/core';
import { IsPreviewEnabledPipe } from '@simbad-client/app/features/examples/simulation-pipeline/core/pipes/is-preview-enabled.pipe';
import { FormatBytesPipe } from '@simbad-client/app/features/examples/simulation-pipeline/core/pipes/format-bytes.pipe';
import { provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { Store } from '@ngrx/store';
import {
    downloadArtifact,
    previewArtifact
} from '@simbad-client/app/features/examples/simulation-pipeline/core/store/artifacts/artifacts.actions';

describe('ArtifactListComponent', () => {
    let component: ArtifactListComponent;
    let fixture: ComponentFixture<ArtifactListComponent>;
    let store: Store<{}>;

    const artifact: ArtifactInfo = {
        fileType: 'CSV',
        name: 'cli_out.csv',
        sizeKb: 123414,
        createdUtc: '12314',
        path: '/some/path',
        id: 1,
        simulationId: 1,
        stepId: 1
    };
    const { id, name } = artifact;

    beforeEach(async(() => {
        return TestBed.configureTestingModule({
            declarations: [
                ArtifactListComponent,
                MockComponent(SmallInputActionComponent),
                MockPipe(IsPreviewEnabledPipe),
                MockPipe(FormatBytesPipe)
            ],
            imports: [
                MatDividerModule,
                MatTableModule,
                MatSortModule,
                MatInputModule,
                MatPaginatorModule,
                MatTooltipModule,
                NoopAnimationsModule,
                TranslateModule.forRoot()
            ],
            providers: [provideMockStore({ initialState: {} })]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArtifactListComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('#ngOnChanges', () => {
        it('should update artifacts in table data source when there is new data in changes', () => {
            // given
            component.ngOnInit();
            const artifacts: ArtifactInfo[] = [{}, {}] as ArtifactInfo[];
            const data: SimpleChange = {
                previousValue: null,
                currentValue: artifacts,
                firstChange: false,
                isFirstChange: () => false
            };
            const changes: SimpleChanges = { data };

            // when
            component.ngOnChanges(changes);

            // then
            expect(component.dataSource.data).toEqual(artifacts);
        });

        it('should not update artifacts in table data source when there is no new data in changes', () => {
            // given
            component.ngOnInit();
            component.dataSource.data = [];
            const changes: SimpleChanges = {};

            // when
            component.ngOnChanges(changes);

            // then
            expect(component.dataSource.data).toEqual([]);
        });
    });

    describe('#applyFilter', () => {
        it('should format and set current dataSource filter', () => {
            // given
            const filterValue = 'Histogram  ';
            const expectedFilter = 'histogram';

            // when
            component.applyFilter(filterValue);

            // then
            expect(component.dataSource.filter).toEqual(expectedFilter);
        });
    });

    describe('#download', () => {
        it('should dispatch downloadArtifact action', () => {
            // given
            jest.spyOn(store, 'dispatch');
            const action = downloadArtifact({ id, name });

            // when
            component.download(artifact);

            // then
            expect(store.dispatch).toBeCalledWith(action);
        });
    });

    describe('#preview', () => {
        it('should dispatch previewArtifact action', () => {
            // given
            jest.spyOn(store, 'dispatch');
            const action = previewArtifact({ id, name });

            // when
            component.preview(artifact);

            // then
            expect(store.dispatch).toBeCalledWith(action);
        });
    });

});
