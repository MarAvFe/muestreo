import { Routes, RouterModule } from '@angular/router';

import { AnalyzeComponent } from './analyze.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyzeComponent
},
];

export const routing = RouterModule.forChild(routes);
