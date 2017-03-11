/**
 * Created by Iulia Mustea on 11/16/2016.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { routing } from "./booking.routing";
import {BookingComponent} from "./booking.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing,

  ],
  declarations: [
    BookingComponent
  ],
  bootstrap: [
    BookingComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    BookingComponent
  ]
})
export class BookingModule { }
