import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulationComponent } from './simulation/simulation.component';
import { FormComponent } from './configuration-editor/components/configuration-form/form.component';
import { SimulationPipelineComponent } from '@simbad-simulation/lib/simulation-pipeline/pages/simulation-pipeline.component';

const routes: Routes = [
    {
        path: '',
        component: SimulationComponent,
        children: [
            {
                path: '',
                redirectTo: 'form',
                pathMatch: 'full'
            },
            {
                path: 'form',
                component: FormComponent,
                data: { title: 'simbad.simulation.menu.form' }
            },
            {
                path: 'simulation-pipeline',
                component: SimulationPipelineComponent,
                data: { title: 'simbad.simulation.menu.simulation-pipeline' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimbadSimulationRoutingModule {}
