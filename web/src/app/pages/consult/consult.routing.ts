import { Routes, RouterModule } from '@angular/router';

import { ConsultComponent } from './consult.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultComponent,
},
];

export const routing = RouterModule.forChild(routes);
