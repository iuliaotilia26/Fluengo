import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { routing } from "./teacher.routing";
import {TeacherComponent} from './teacher.component'
import {TeacherCardComponent} from "./teacher-card/teacher-card.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {BookModalComponent} from "./modal/book-modal.component";
import {DateTimePickerDirective} from "../common-directives/date-time-picker.directive";
import {ToastModule} from "ng2-toastr";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2Bs3ModalModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  declarations: [
    TeacherComponent,
    TeacherCardComponent,
    BookModalComponent,
    DateTimePickerDirective
  ],
  bootstrap: [
    TeacherComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    TeacherComponent
  ]
})
export class TeacherModule { }
