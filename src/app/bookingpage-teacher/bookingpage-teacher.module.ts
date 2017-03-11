/**
 * Created by Iulia Mustea on 12/20/2016.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { routing } from "./bookingpage-teacher.routing";
import { Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {BookingCardTeacherComponent} from "./bookingpage-teacher-card/bookingpage-teacher-card.component";
import {BookingTeacherComponent} from "./bookingpage-teacher.component";
import {CreateTeacherComponent} from "../common-createTeacherModal/createTeacher-modal.component";
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
    BookingCardTeacherComponent,
    BookingTeacherComponent

  ],
  bootstrap: [
    BookingTeacherComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    BookingTeacherComponent
  ]
})
export class BookingTeacherModule { }
