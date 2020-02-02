import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsBrowserComponent } from './pages/results-browser/results-browser.component';
import { SimbadResultsRoutingModule } from '@simbad-results/lib/simbad-results-routing.module';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { StoreModule } from '@ngrx/store';
import {
    simulationResultsFeatureKey,
    simulationResultsReducer
} from '@simbad-results/lib/core/store/simulation-results.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SimulationResultsEffects } from '@simbad-results/lib/core/store/simulation-results.effects';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@simbad-client/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [
        CommonModule,
        SimbadResultsRoutingModule,
        StoreModule.forFeature(simulationResultsFeatureKey, simulationResultsReducer),
        EffectsModule.forFeature([SimulationResultsEffects]),
        MatInputModule,
        MatTableModule,
        SharedModule,
        MatPaginatorModule,
        MatSortModule,
        CdkTableModule
    ],
    declarations: [ResultsBrowserComponent, ResultsTableComponent]
})
export class SimbadResultsModule {}
