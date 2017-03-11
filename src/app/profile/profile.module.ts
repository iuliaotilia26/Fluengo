/**
 * Created by Iulia Mustea on 12/6/2016.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { routing } from "./profile.routing";
import {ProfileComponent} from './profile.component'
import {ProfileCardComponent} from "./profile-card/profile-card.component";
import {CreateTeacherComponent} from "../common-createTeacherModal/createTeacher-modal.component";
import { Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {EditStudentComponent} from "../common-editStudent/editStudent-modal.component";
import {EditStudentStep1Component} from "../common-editStudent/editStudent-modalStep1.component";
import {EditStudentStep2Component} from "../common-editStudent/editStudent-modalStep2.component";
import {CreateTeacherStep1Component} from "../common-createTeacherModal/createTeacher-modalStep1.component";
import {CreateTeacherStep2Component} from "../common-createTeacherModal/createTeacher-modalStep2.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    Ng2Bs3ModalModule

  ],
  declarations: [
    ProfileComponent,
    ProfileCardComponent,
    EditStudentComponent,
    EditStudentStep1Component,
    EditStudentStep2Component,
    CreateTeacherComponent,
    CreateTeacherStep1Component,
    CreateTeacherStep2Component

  ],
  bootstrap: [
    ProfileComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
