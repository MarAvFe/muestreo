import { Routes, RouterModule } from '@angular/router';
import { ResetPassword } from './resetpassword.component';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ResetPassword,
},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
