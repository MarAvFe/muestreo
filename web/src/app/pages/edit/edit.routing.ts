import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
},
];

export const routing = RouterModule.forChild(routes);
