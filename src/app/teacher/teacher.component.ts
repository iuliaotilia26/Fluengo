import {Component, NgZone,  OnInit,  ChangeDetectorRef, ViewEncapsulation} from '@angular/core';

import {TeacherService } from "../services/teacher.service";

import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';
import {BookModalComponent} from "./modal/book-modal.component";
import {ViewChild} from "@angular/core/src/metadata/di";
import {LoginService} from "../services/login.service";

declare const $: any;
@Component({

  selector: 'teacher',
  providers: [

  ],

  styleUrls: ['teacher.component.css'],
  templateUrl: 'teacher.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TeacherComponent implements OnInit {
  isLoaded: boolean = false;

  model = {};
  teacherId = null;


  people = [];

  @ViewChild(BookModalComponent)
  bookModal: BookModalComponent;




  constructor( private teacherService: TeacherService , private ref: ChangeDetectorRef, private route: ActivatedRoute, private location: Location, private loginService: LoginService) {
  }

  ngOnInit() {


    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      let book = +params['book'];
      this.teacherId = id;

      this.teacherService.getProfile(id)
        .subscribe((Model) => {
            this.model = Model;

          console.log(this.model.image_name);

            setTimeout(() => this.ref.detectChanges());
            this.isLoaded = true;

            if (book === 1) {
              this.openModal();
            }
          },
          (error) => {
            alert(error);
            this.location.back();
          });

      this.teacherService.getMoreProfiles(id)
        .subscribe((persons) => {
            this.people = persons;
            setTimeout(() => this.ref.detectChanges());

          },
          (error) => {
            alert(error);
            this.location.back();
          });

    });
  }


  openModal() {



    this.loginService.getLogin()
      .subscribe((login) => {


          if (login !== null)this.bookModal.open(this.model);
          else {

            this.loginService.register('/teacher/' + this.teacherId + ';book=1');

          }

          setTimeout(() => this.ref.detectChanges());

        },
        (error) => {
          alert(error);
        });

  }
}
