/**
 * Created by Iulia Mustea on 12/6/2016.
 */
import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProfileService} from "../services/profile.service";
import {LoginService} from "../services/login.service";
import {EditStudentComponent} from "../common-editStudent/editStudent-modal.component";
import {CreateTeacherComponent} from "../common-createTeacherModal/createTeacher-modal.component";

@Component({

  selector: 'profile',

  styleUrls: ['profile.component.css'],
  templateUrl: 'profile.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  @ViewChild(EditStudentComponent)
  editModal: EditStudentComponent;

  @ViewChild(CreateTeacherComponent)
  createModal: CreateTeacherComponent;


  profileBookings=[];

  isStudentTeacher:boolean=false;


  constructor(private profileService: ProfileService , private ref: ChangeDetectorRef, private route: ActivatedRoute, private loginService: LoginService) {
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let id = +params['id'];

      this.profileService.getBookings(id)
        .subscribe((response) => {

            this.profileBookings = response.bookings;

            setTimeout(() => this.ref.detectChanges());

          },
          (error) => {
            alert(error);
          });


      this.loginService.getLogin()
        .subscribe((login) => {


            if(login.teacher_id === null)this.isStudentTeacher=false;

            else this.isStudentTeacher=true;

            setTimeout(() => this.ref.detectChanges());
          },
          (error) => {
            alert(error);
          });
    });

  }

  openModalEdit() {


    this.loginService.getLogin()
      .subscribe((login) => {


          if (login !== null) this.editModal.open(login);

          setTimeout(() => this.ref.detectChanges());

        },
        (error) => {
          alert(error);
        });

  }


  openModalCreate() {


    this.loginService.getLogin()
      .subscribe((login) => {


          if (login !== null) this.createModal.open(login);

          setTimeout(() => this.ref.detectChanges());

        },
        (error) => {
          alert(error);
        });

  }


}
