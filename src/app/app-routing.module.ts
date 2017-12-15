import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { DefaultLayoutComponent }       from './layouts/default/default.component';
import { ExtraLayoutComponent }         from './layouts/extra/extra.component';

import { PageDashboardComponent }       from './pages/dashboard/dashboard.component';
import { PagestcComponent }       from './pages/vendors/stc/stc-progress.component';
import { PagesharedComponent }       from './pages/vendors/shared/shared-progress.component';

import { PageZainComponent }       from './pages/vendors/zain/zain-progress.component';
import { PageMobilyComponent }        from './pages/vendors/mobily/mobily-progress.component';
import { PageLocationsComponent }  from './pages/location/locations.component';
import { PageStatusSTCComponent }  from './pages/vendors/stc/status/stc-status.component';
import { PageStatussharedComponent }  from './pages/vendors/shared/status/shared-status.component';

import { PageStatusZainComponent }  from './pages/vendors/zain/status/zain-status.component';
import { PageStatusMobilyComponent }  from './pages/vendors/mobily/status/mobily-status.component';
import { PageGoogleMapComponent }          from './pages/map/google-map.component';
import { PageSignIn1Component }            from './pages/sign-in-1/sign-in-1.component';

import { AuthGuard } from './_guards/auth.guard';

const defaultRoutes: Routes = [ 
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'stc', component: PagestcComponent },
  { path: 'shared', component: PagesharedComponent },
  { path: 'zain', component: PageZainComponent },
  { path: 'mobily', component: PageMobilyComponent },
  { path: 'stc/status', component: PageStatusSTCComponent },
  { path: 'shared/status', component: PageStatussharedComponent },
  { path: 'zain/status', component: PageStatusZainComponent },
  { path: 'mobily/status', component: PageStatusMobilyComponent },
  { path: 'locations', component: PageLocationsComponent },
  { path: 'map-aramco-locations', component: PageGoogleMapComponent },
];

const extraRoutes: Routes = [
  { path: 'sign-in', component: PageSignIn1Component },
]



export const routes: Routes = [
  {
    path: '',
    redirectTo: '/progress/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'progress',
    component: DefaultLayoutComponent,
    children: defaultRoutes, canActivate: [AuthGuard]//,
  //   data: {
  //     permission: {
  //         only: ['Aramco','STC','Zain','Mobily'],
  //         redirectTo: 'sign-in'
  //     }
  // } 
  },
  {
    path: '',
    component: ExtraLayoutComponent,
    children: extraRoutes
  },
  {
    path: '**',
    component: DefaultLayoutComponent,
    children: defaultRoutes
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}