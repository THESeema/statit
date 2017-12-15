import { NgModule }                        from '@angular/core';
import { CommonModule }                    from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NiComponentsModule }              from '../ni-components/ni-components.module';
import { MaterialModule }                  from '@angular/material';
import { ChartsModule }                    from 'ng2-charts';
import { NgxChartsModule }                 from '@swimlane/ngx-charts';
import { CalendarModule }                  from 'angular-calendar';
import { NgxDatatableModule }              from '@swimlane/ngx-datatable';
import { AgmCoreModule }                   from '@agm/core';
import { SqueezeBoxModule }                from 'squeezebox';
import { AmChartsModule }                  from "@amcharts/amcharts3-angular";

import { PageDashboardComponent }          from './dashboard/dashboard.component';
import { PagestcComponent }          from './vendors/stc/stc-progress.component';
import { PagesharedComponent }          from './vendors/shared/shared-progress.component';

import { PageZainComponent }          from './vendors/zain/zain-progress.component';
import { PageMobilyComponent }           from './vendors/mobily/mobily-progress.component';
import { PageLocationsComponent }          from './location/locations.component';
import { PageStatusSTCComponent }          from './vendors/stc/status/stc-status.component';
import { PageStatussharedComponent }          from './vendors/shared/status/shared-status.component';

import { PageStatusZainComponent }          from './vendors/zain/status/zain-status.component';
import { PageStatusMobilyComponent }          from './vendors/mobily/status/mobily-status.component';

import { PageGoogleMapComponent }          from './map/google-map.component';

import { LocationsService }                  from '../services/location.service'; //api
import { StatusService }                     from '../services/status.service'; //api

//sign in
import { AuthGuard } from '../_guards/auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { PageSignIn1Component }            from './sign-in-1/sign-in-1.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NiComponentsModule,
    MaterialModule,
    ChartsModule,
    NgxChartsModule,
    
    CalendarModule.forRoot(),
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
    }),
    SqueezeBoxModule,
    AmChartsModule
  ],
  declarations: [
    PageDashboardComponent,
    PageLocationsComponent,
    PagestcComponent,
    PagesharedComponent,
    PageZainComponent,
    PageMobilyComponent,
    PageStatusSTCComponent,
    PageStatussharedComponent,
    
    PageStatusZainComponent,
    PageStatusMobilyComponent,
    PageGoogleMapComponent,
    PageSignIn1Component
  ],
  providers: [
    LocationsService,
    StatusService,
    AuthGuard,
    AuthenticationService,
    UserService
  ],  
  
  exports: [
    PageDashboardComponent, 
    PageLocationsComponent,
    PagestcComponent,
    PagesharedComponent,
    PageZainComponent,
    PageMobilyComponent,
    PageStatusSTCComponent,
    PageStatussharedComponent,
    PageStatusZainComponent,
    PageStatusMobilyComponent,
    PageGoogleMapComponent,
    PageSignIn1Component
  ]

})
export class PagesModule {}
