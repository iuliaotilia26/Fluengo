import {Component, NgZone, OnInit, ChangeDetectorRef} from '@angular/core';

import { AppState } from '../app.service';
import {TeachersService} from "../services/teachers.service";
import {ActivatedRoute, Params} from "@angular/router";


declare const $: any;

@Component({

  selector: 'teachers',

  providers: [

  ],

  styleUrls: [ 'teachers.component.css' ],
  templateUrl: 'teachers.component.html'
})
export class TeachersComponent implements OnInit  {
  cards = [];

  localState = { value: '' };


  constructor(public appState: AppState, private teacherService:TeachersService,private zone: NgZone, private ref: ChangeDetectorRef,public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {

      this.teacherService.getTeachers(params.language, params.location).subscribe((teachers) => {
        this.cards = teachers;
        setTimeout(() => this.ref.detectChanges());
      });
    });

  }

}
