import { Routes, RouterModule } from '@angular/router';

import { MySamplingsComponent } from './mySamplings.component';

const routes: Routes = [
  {
    path: '',
    component: MySamplingsComponent,
},
];

export const routing = RouterModule.forChild(routes);
