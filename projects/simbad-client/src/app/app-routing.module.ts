import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
    {
        path: 'about',
        loadChildren: './features/about/about.module#AboutModule'
    },
    {
        path: 'feature-list',
        loadChildren: './features/feature-list/feature-list.module#FeatureListModule'
    },
    {
        path: 'settings',
        loadChildren: './features/settings/settings.module#SettingsModule'
    },
    {
        path: 'examples',
        loadChildren: './features/examples/examples.module#ExamplesModule'
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            scrollPositionRestoration: 'enabled',
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
