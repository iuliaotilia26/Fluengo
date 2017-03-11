/**
 * Created by Iulia Mustea on 12/16/2016.
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";
import { routing } from "./privacy.routing";
import {PrivacyComponent} from "./privacy,component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    PrivacyComponent
  ],
  bootstrap: [
    PrivacyComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    PrivacyComponent
  ]
})
export class PrivacyModule { }
