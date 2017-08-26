import { Routes, RouterModule } from '@angular/router';

import { ResetPwdComponent } from './resetpwd.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPwdComponent,
},
];

export const routing = RouterModule.forChild(routes);
