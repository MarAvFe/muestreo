import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { IsLoggedInGuard } from '../guards/isLoggedInGuard.guard';
import { IsLoggedInGuardService } from '../guards/isLoggedInGuard.service';

@NgModule({
  imports: [
      CommonModule,
      AppTranslationModule,
      NgaModule,
      routing,
  ],
  declarations: [
      Pages,
  ],
  providers: [
      IsLoggedInGuardService,
      IsLoggedInGuard,
  ],
})
export class PagesModule {
}
