/**
 * Created by Iulia Mustea on 11/16/2016.
 */
import {Component, NgZone, OnInit, ChangeDetectorRef} from '@angular/core';

import { AppState } from '../app.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BookingService} from "../services/booking.service";
import {ToastsManager} from "ng2-toastr";
import {LoginService} from "../services/login.service";

@Component({

  selector: 'booking',
  providers: [],
  styleUrls: [ 'booking.component.css' ],
  templateUrl: 'booking.component.html'
})
export class BookingComponent implements OnInit {

  model={};

  isTeacher:boolean=false;
  isStudent:boolean=false;

  statusNow:string;


  constructor( private ref: ChangeDetectorRef,private loginService:LoginService,private bookingService:BookingService, public route: ActivatedRoute,public toastr: ToastsManager) {

  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      let role = params['role'];

      if (role === 'student') {

        this.isStudent=true;

        this.loginService.getLogin()
          .subscribe((login) => {


                if(login === null) window.location.href = '/api/auth/facebook';

                else {
                this.bookingService.getInformationsStudent(id)
                  .subscribe((Info) => {

                      this.model = Info;
                      this.statusNow= this.model.status;
                      setTimeout(() => this.ref.detectChanges());

                    },
                    (error) => {
                      alert(error);
                    });
              }
            },
            (error) => {
             alert(error);
            });

      }

      if (role === 'teacher') {

        this.isTeacher=true;
        this.bookingService.getInformationsTeacher(id)
          .subscribe((Info) => {

              this.model = Info;
              this.statusNow= this.model.status;
              setTimeout(() => this.ref.detectChanges());

            },
            (error) => {
              alert(error);
            });
      }
   });
  }

  acceptAction() {

    var reply=this.bookingService.changeStatus( this.model.teacher_link,'accept')
      .then((responseFromServer) => {
        this.toastr.success('Changed status', 'Success!');
        this.statusNow="accepted";
        this.model.status=this.statusNow;
      }).catch((errorFromServer) => {
        this.toastr.error('Not able to perform this action', 'Inconceivable!');
      });

  }
  rejectAction(){
    var reply=this.bookingService.changeStatus( this.model.teacher_link,'reject')
      .then((responseFromServer) => {
        this.toastr.success('Changed status', 'Success!');
        this.statusNow="rejected";
        this.model.status=this.statusNow;
      }).catch((errorFromServer) => {
        this.toastr.error('Not able to perform this action', 'Inconceivable!');
      });

  }
  cancelAction(){
    var reply=this.bookingService.changeStatus( this.model.teacher_link,'cancel')
      .then((responseFromServer) => {
        this.toastr.success('Changed status', 'Success!');
        this.statusNow="canceled";
        this.model.status=this.statusNow;
      }).catch((errorFromServer) => {
        this.toastr.error('Not able to perform this action', 'Inconceivable!');
      });

  }
  cancelStudentAction()
  {
    var reply=this.bookingService.cancelStudent( this.model.student_link)
      .then((responseFromServer) => {
        this.toastr.success('Changed status', 'Success!');
        this.statusNow='canceled';
        this.model.status=this.statusNow;
      }).catch((errorFromServer) => {
        this.toastr.error('Not able to perform this action', 'Inconceivable!');
      });
  }
}

