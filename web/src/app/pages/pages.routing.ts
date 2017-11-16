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
                path: 'manageData',
                loadChildren: './manageData/manageData.module#ManageDataModule',
            },
            {
                path: 'analyze',
                loadChildren: './analyze/analyze.module#AnalyzeModule',
            },
        ],
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
