import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ArtifactInfo } from '@simbad-cli-api/gen/models/artifact-info';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import {
    downloadArtifact,
    previewArtifact
} from '@simbad-client/app/features/examples/simulation-pipeline/core/store/artifacts/artifacts.actions';

@Component({
    selector: 'simbad-client-artifact-list',
    templateUrl: './artifact-list.component.html',
    styleUrls: ['./artifact-list.component.scss']
})
export class ArtifactListComponent implements OnChanges, OnInit {
    @Input() data: ArtifactInfo[];

    displayedColumns: string[] = ['name', 'fileType', 'sizeKb', 'actions'];
    public dataSource = new MatTableDataSource<ArtifactInfo>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private store: Store<{}>) {
    }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data) {
            this.dataSource.data = changes.data.currentValue as ArtifactInfo[];
        }
    }

    applyFilter(filterValue: string): void {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLocaleLowerCase();
        this.dataSource.filter = filterValue;
    }

    download(artifact: ArtifactInfo) {
        const { id, name } = artifact;
        this.store.dispatch(downloadArtifact({ id, name }));
    }

    preview(artifact: ArtifactInfo) {
        const { id, name } = artifact;
        this.store.dispatch(previewArtifact({ id, name }));
    }
}
