/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation, ChangeDetectorRef, ViewChild} from '@angular/core';

import {AppState} from './app.service';
import {LoginService} from "./services/login.service";
import {SignInModalComponent} from "./common-signInModal/signin-modal.component";
import {CreateTeacherComponent} from "./common-createTeacherModal/createTeacher-modal.component";

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {


  @ViewChild(SignInModalComponent)
  signInModal: SignInModalComponent;


  isLogged:boolean=false;
  isStudentTeacher:boolean=false;

  constructor(public  loginService:LoginService,private ref: ChangeDetectorRef )
  {

  }

  ngOnInit() {

    this.loginService.onRegister((returnUrl) => {
      this.registerUser(returnUrl);
    });
    this.loginService.getLogin()
      .subscribe((login) => {


          if(login !== null)
          {
            this.isLogged = true;

            if (login.teacher_id === null)this.isStudentTeacher = false;

            else this.isStudentTeacher = true;
          }

          setTimeout(() => this.ref.detectChanges());

        },
        (error) => {
          alert(error);
        });
  }

  registerUser(returnUrl: string = null) {

    this.signInModal.open(returnUrl);
  }
  goToProfile(){

    this.loginService.getLogin()
      .subscribe((login) => {


          if(login !== null) window.location.href = '/profile/' + login.id;
          setTimeout(() => this.ref.detectChanges());

        },
        (error) => {
          alert(error);
        });


  }

  goToBookings() {
    this.loginService.getLogin()
      .subscribe((login) => {


          if(login !== null) window.location.href = '/bookingPage/' + login.teacher_id;
          setTimeout(() => this.ref.detectChanges());

        },
        (error) => {
          alert(error);
        });
  }


}

