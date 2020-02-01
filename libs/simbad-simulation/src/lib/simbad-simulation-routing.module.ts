import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@simbad-client/app/core/core.module';

import { ExamplesComponent } from './examples/examples.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { FormComponent } from './configuration-editor/components/configuration-form/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { SimulationPipelineComponent } from '@simbad-simulation/lib/simulation-pipeline/pages/simulation-pipeline.component';

const routes: Routes = [
    {
        path: '',
        component: ExamplesComponent,
        children: [
            {
                path: '',
                redirectTo: 'form',
                pathMatch: 'full'
            },
            {
                path: 'form',
                component: FormComponent,
                data: { title: 'simbad.examples.menu.form' }
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                data: { title: 'simbad.examples.menu.notifications' }
            },
            {
                path: 'authenticated',
                component: AuthenticatedComponent,
                canActivate: [AuthGuardService],
                data: { title: 'simbad.examples.menu.auth' }
            },
            {
                path: 'simulation-pipeline',
                component: SimulationPipelineComponent,
                data: { title: 'simbad.examples.menu.simulation-pipeline' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimbadSimulationRoutingModule {}
