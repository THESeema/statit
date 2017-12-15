import { Http } from '@angular/http';

import { BrowserModule }                    from '@angular/platform-browser';
import { RouterModule }                     from '@angular/router';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { HttpModule }                       from '@angular/http';

import { routes, AppRoutingModule }         from './app-routing.module';
import { AppComponent }                     from './app.component';
import { UIModule }                         from './ui/ui.module';
import { NiComponentsModule }               from './ni-components/ni-components.module';
import { PagesModule }                      from './pages/pages.module';
import { DefaultLayoutComponent }           from './layouts/default/default.component';
import { ExtraLayoutComponent }             from './layouts/extra/extra.component';

import { LocationsService }                  from './services/location.service'; //api
import { StatusService }                  from './services/status.service'; //api
//sign in
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

export function httpFactory(backend: MockBackend, defaultOptions: BaseRequestOptions) {
  return  new Http(backend, defaultOptions);
}
@NgModule({
  declarations : [
    AppComponent,
    DefaultLayoutComponent,
    ExtraLayoutComponent
  ],
  providers:[
    LocationsService,
    StatusService, //api
    AuthGuard,
    AuthenticationService,
    UserService,
       // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AppRoutingModule,
    UIModule,
    NiComponentsModule,
    PagesModule
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
