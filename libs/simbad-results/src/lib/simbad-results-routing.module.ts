import { NgModule } from '@angular/core';
import { ResultsBrowserComponent } from './pages/results-browser/results-browser.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ResultsBrowserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimbadResultsRoutingModule {}
