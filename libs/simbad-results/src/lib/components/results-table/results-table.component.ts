import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SimulationSimpleInfo } from '@simbad-cli-api/gen/models/simulation-simple-info';
import { IconModel } from '@simbad-simulation/lib/simulation-pipeline/pages/simulation-pipeline.component';
import { timeToTimeString } from '@simbad-simulation/lib/simulation-pipeline/core/functions/time-utils';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { downloadArtifact } from '@simbad-simulation/lib/simulation-pipeline/core/store/artifacts/artifacts.actions';

interface RuntimeMap {
    [key: number]: string;
}

@Component({
    selector: 'simbad-results-table',
    templateUrl: './results-table.component.html',
    styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnChanges, OnInit, OnDestroy {
    @Input() data: SimulationSimpleInfo[];

    // displayedColumns: string[] = ['configuration', 'status', 'started', 'runtime', 'results', 'actions'];
    displayedColumns: string[] = [
        'simulationId',
        'configuration',
        'started',
        'status',
        'runtime',
        'results',
        'actions'
    ];
    dataSource = new MatTableDataSource<SimulationSimpleInfo>();

    runtimeMap$: Observable<RuntimeMap>;
    timer$: Observable<number>;
    ngUnsubscribe$: Subject<void> = new Subject();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private store: Store<{}>) {}

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.timer$ = timer(0, 1000);

        this.runtimeMap$ = combineLatest([this.timer$, this.dataSource.connect()]).pipe(
            map(([, data]) => {
                return data.reduce((prev, curr) => {
                    prev[curr.simulationId] = timeToTimeString(curr.startedUtc, curr.finishedUtc);
                    return prev;
                }, {});
            })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data) {
            console.log(changes.data);
            this.dataSource.data = changes.data.currentValue as SimulationSimpleInfo[];
        }
    }

    applyFilter(filterValue: string): void {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLocaleLowerCase();
        this.dataSource.filter = filterValue;
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
            return data.configuration.name.toLowerCase().includes(filter);
        };
    }

    buildIconForStep(status: string): IconModel {
        return (
            {
                ['SUCCESS']: { icon: 'check' },
                ['ONGOING']: { icon: 'spinner', spin: true, pulse: true },
                ['PENDING']: { icon: 'ellipsis-h' },
                ['FAILURE']: { icon: 'times' }
            }[status] || { icon: 'ellipsis-h' }
        );
    }

    download(id: number, name: string): void {
        this.store.dispatch(downloadArtifact({ id, name }));
    }

    goToModelViewer(simulationId: number): void {
        console.log('Opening Spark UI...');
        const url = `http://localhost:8080/viewer/?r=${simulationId}`;
        window.open(url, '_blank');
    }

    rerun(simulationId: number) {
        console.log('Rerun');
    }

    loadInSimulationPipeline(simulationId: number) {
        console.log('Load in pipeline');
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
    }
}
