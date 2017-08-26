import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create.component';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
},
];

export const routing = RouterModule.forChild(routes);
