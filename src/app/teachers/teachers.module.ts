import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";
import { routing } from "./teachers.routing";
import {TeachersComponent} from './teachers.component'
import {TeachersCardComponent} from "./teachers-card/teachers-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    TeachersComponent,
    TeachersCardComponent
  ],
  bootstrap: [
    TeachersComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    TeachersComponent
  ]
})
export class TeachersModule { }
