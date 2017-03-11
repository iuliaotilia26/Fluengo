
/**
 * Created by Iulia Mustea on 12/6/2016.
 */
import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TeacherBookingsService} from "../services/teacherBookings.service";
import {CreateTeacherComponent} from "../common-createTeacherModal/createTeacher-modal.component";
import {LoginService} from "../services/login.service";


@Component({

  selector: 'bookingpage-teacher',
  styleUrls: ['bookingpage-teacher.component.css'],
  templateUrl: 'bookingpage-teacher.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BookingTeacherComponent implements OnInit {

  bookings=[];

  constructor( private ref: ChangeDetectorRef, private route: ActivatedRoute, private teacherBookings:TeacherBookingsService,public  loginService:LoginService) {
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let id = +params['id'];

      this.teacherBookings.getBookingsTeacher(id)
        .subscribe((result) => {

            this.bookings = result;

            setTimeout(() => this.ref.detectChanges());

          },
          (error) => {
            alert(error);
          });

    });


  }




}
