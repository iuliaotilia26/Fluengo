/**
 * Created by Iulia Mustea on 12/16/2016.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";
import { routing } from "./terms.routing";
import {TermsComponent} from "./terms.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    TermsComponent
  ],
  bootstrap: [
    TermsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    TermsComponent
  ]
})
export class TermsModule { }
