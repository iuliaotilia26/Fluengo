import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { HomeSearchComponent } from "./home-search/home-search.component";
import {FormsModule} from "@angular/forms";
import { routing } from "./home.routing";
import {SelectControlDirective} from "../common-directives/select-control.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    HomeComponent,
    HomeSearchComponent,
    SelectControlDirective
  ],
  bootstrap: [
    HomeComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
