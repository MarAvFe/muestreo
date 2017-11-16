import { Routes, RouterModule } from '@angular/router';

import { ManageDataComponent } from './manageData.component';

const routes: Routes = [
  {
    path: '',
    component: ManageDataComponent,
},
];

export const routing = RouterModule.forChild(routes);
