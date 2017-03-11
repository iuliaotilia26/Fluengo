import {NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';

import {AppComponent} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {AppState, InternalStateType} from './app.service';
import {AboutComponent} from './about';
import {NoContentComponent} from './no-content';
import {HomeModule} from "./home";
import { TeachersModule} from "./teachers/teachers.module";
import {TeacherModule} from "./teacher/teacher.module";
import {TeachersService} from "./services/teachers.service";
import {TeacherService} from "./services/teacher.service";
import {SearchService} from "./services/search.service";
import { NgModule }      from '@angular/core';
import {BookingModule} from "./booking/booking.module";
import {BookingService} from "./services/booking.service";
import {LoginService} from "./services/login.service";
import {ProfileModule} from "./profile/profile.module";
import {ProfileService} from "./services/profile.service";
import {SignInModalComponent} from "./common-signInModal/signin-modal.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {CreateTeacherService} from "./services/create.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./services/authGuard";
import {PrivacyModule} from "./privacy/privacy.module";
import {TermsModule} from "./terms/terms.module";
import {BookingTeacherModule} from "./bookingpage-teacher/bookingpage-teacher.module";
import {TeacherBookingsService} from "./services/teacherBookings.service";
import {CreateTeacherComponent} from "./common-createTeacherModal/createTeacher-modal.component";
import {CreateTeacherStep1Component} from "./common-createTeacherModal/createTeacher-modalStep1.component";
import {CreateTeacherStep2Component} from "./common-createTeacherModal/createTeacher-modalStep2.component";

//noinspection TypeScriptCheckImport
import {Uploader} from 'angular2-http-file-upload';
import {EditStudentComponent} from "./common-editStudent/editStudent-modal.component";
import {EditStudentStep1Component} from "./common-editStudent/editStudent-modalStep1.component";
import {EditStudentStep2Component} from "./common-editStudent/editStudent-modalStep2.component";
import {EditStudentService} from "./services/editStudent.service";


const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    NoContentComponent,
    SignInModalComponent


  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: false}),
    FormsModule,
    HomeModule,
    TeachersModule,
    TeacherModule,
    BookingModule,
    ProfileModule,
    PrivacyModule,
    TermsModule,
    BookingTeacherModule,
    Ng2Bs3ModalModule,
    ReactiveFormsModule

  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    TeachersService,
    TeacherService,
    SearchService,
    BookingService,
    LoginService,
    ProfileService,
    CreateTeacherService,
    TeacherBookingsService,
    EditStudentService,
    AuthGuard,
    Uploader
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

