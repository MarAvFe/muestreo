import { Routes, RouterModule } from '@angular/router';

import { ResetPassword } from './resetpassword.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPassword,
},
];

export const routing = RouterModule.forChild(routes);
