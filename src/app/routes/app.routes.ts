import { Routes } from '@angular/router';
import { WipComponent } from '../features/wip/pages/wip.component';
import { LandingComponent } from '../features/landing/pages/landing.component';
import { LegalNoticeComponent } from '../features/legal/pages/legal-notice/legal-notice.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'wip',
    component: WipComponent,
  },
  {
    path: 'mentions-legales',
    component: LegalNoticeComponent,
  },
];

export const appRoutes: Routes = [
  {
    path: 'fr',
    children: mainRoutes,
  },
  {
    path: 'en',
    children: mainRoutes,
  },
  {
    path: '',
    redirectTo: '/fr',
    pathMatch: 'full',
  },
  {
    path: 'wip',
    redirectTo: '/fr/wip',
    pathMatch: 'full',
  },
  {
    path: 'mentions-legales',
    redirectTo: '/fr/mentions-legales',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: WipComponent,
  },
];
