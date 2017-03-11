/**
 * Created by Iulia Mustea on 1/13/2017.
 */
import {Component, ViewEncapsulation, ChangeDetectorRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {CreateTeacherService} from "../services/create.service";
import {TeacherService} from "../services/teacher.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'create-modalStep1',
  templateUrl: 'createTeacher-modalStep1.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateTeacherStep1Component implements OnInit {
  @Input() profileInfo={};
  @Output() onSubmitted = new EventEmitter<boolean>();

  form: FormGroup;

 userData={};


  constructor(private formBuilder: FormBuilder,private createTeacherService:CreateTeacherService,private teacherService:TeacherService,public toastr: ToastsManager,private loginService:LoginService, private ref: ChangeDetectorRef)
  {

  }

  ngOnInit() {
    this.initializeForm();
    this.populateForm();
  }

  private populateForm() {
    this.loginService.getLogin()
      .subscribe((login) => {


          if(login!==null && login.teacher_id !== null)
          {

            this.teacherService.getProfile(login.teacher_id)
              .subscribe((resultTeacher) => {
                this.userData=resultTeacher;
                this.initializeForm();
              });
          }

        },
        (error) => {
          alert(error);
        });
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      'description': [this.userData.description, [
        Validators.required
      ]],
      'locat': [this.userData.location, [
        Validators.required
      ]],
      'language': [this.userData.language, [
        Validators.required
      ]],
      'level': [this.userData.level, [
        Validators.required
      ]]
      ,
      'hour' : [this.userData.duration,[
        Validators.required
      ]],
      'price' : [this.userData.price,[
        Validators.required
      ]],
      'currency' : [this.userData.currency,[
        Validators.required
      ]]
    });
  }
  onSubmit(form) {

    this.onSubmitted.emit(true);

    this.toastr.success('Teacher profile updated!', 'Success!');

    let data = {
      'teacher_id':this.profileInfo.teacher_id,
      'id':this.profileInfo.id,
      'name':this.profileInfo.name,
      'email':this.profileInfo.email,
      'description': form.description,
      'location': form.locat,
      'language':form.language,
      'level':form.level,
      'duration':form.hour,
      'price':form.price,
      'currency':form.currency
    };


    if (this.profileInfo.teacher_id === null)//not a teacher yet, create a profile
    {
      this.createTeacherService.postCreateTeacher(data).then(() => {

        this.initializeForm();

      }).catch((err) => {
      });
    }

    else//update
    {
      this.createTeacherService.postUpdateTeacher(data).then(() => {

        this.initializeForm();

      }).catch((err) => {

      });
    }
  }
}
