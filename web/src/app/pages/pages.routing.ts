import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { IsLoggedInGuard } from '../guards/isLoggedInGuard.guard';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: 'app/pages/login/login.module#LoginModule',
    },
    {
        path: 'logout',
        loadChildren: 'app/pages/logout/logout.module#LogoutModule',
    },
    {
        path: 'register',
        loadChildren: 'app/pages/register/register.module#RegisterModule',
    },
    {
        path: 'resetPassword',
        loadChildren: 'app/pages/resetpassword/resetpassword.module#ResetPasswordModule',
    },
    {
        path: 'pages',
        component: Pages,
        canActivate: [IsLoggedInGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

            {
                path: 'about',
                loadChildren: './about/about.module#AboutModule',
                canActivate: [IsLoggedInGuard],
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule',
            },
            {
                path: 'mySamplings',
                loadChildren: './mySamplings/mySamplings.module#MySamplingsModule',
            },
            {
                path: 'admin/create',
                loadChildren: './create/create.module#CreateModule',
            },
            {
                path: 'admin/edit',
                loadChildren: './edit/edit.module#EditModule',
            },
            {
                path: 'admin/delete',
                loadChildren: './delete/delete.module#DeleteModule',
            },
            {
                path: 'admin/consult',
                loadChildren: './consult/consult.module#ConsultModule',
            },
            {
                path: 'analyze',
                loadChildren: './analyze/analyze.module#AnalyzeModule',
            },

            {
                path: 'editors',
                loadChildren: './editors/editors.module#EditorsModule',
            },
            {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule',
            },
            {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule',
            },
            {
                path: 'ui',
                loadChildren: './ui/ui.module#UiModule',
            },
            {
                path: 'forms',
                loadChildren: './forms/forms.module#FormsModule',
            },
            {
                path: 'tables',
                loadChildren: './tables/tables.module#TablesModule',
            },
            {
                path: 'maps',
                loadChildren: './maps/maps.module#MapsModule',
            },
        ],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
