/**
 * Created by Iulia Mustea on 1/26/2017.
 */
import {Component, ViewEncapsulation, ChangeDetectorRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {LoginService} from "../services/login.service";
import {EditStudentService} from "../services/editStudent.service";

@Component({
  selector: 'edit-modalStep1',
  templateUrl: 'editStudent-modalStep1.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditStudentStep1Component implements OnInit {
  @Input() profileInfo={};
  @Output() onSubmitted = new EventEmitter<boolean>();

  formEdit: FormGroup;

  userData={};


  constructor(private formBuilder: FormBuilder,private editStudentService:EditStudentService,public toastr: ToastsManager,private loginService:LoginService, private ref: ChangeDetectorRef)
  {

  }

  ngOnInit() {

    this.initializeForm();
    this.populateForm();
  }

  private populateForm() {
    this.loginService.getLogin()
      .subscribe((login) => {


          if(login!==null)
          {
                this.userData=login;
                this.initializeForm();
          }

        },
        (error) => {
          alert(error);
        });
  }

  private initializeForm() {
    this.formEdit = this.formBuilder.group({
      'name': [this.userData.name, [
        Validators.required
      ]],
      'email': [this.userData.email, [
        Validators.required
      ]]
    });
  }
  onSubmit(form) {

    this.onSubmitted.emit(true);

    this.toastr.success('Student profile updated!', 'Success!');

    let data = {
      'id':this.profileInfo.id,
      'teacher_id':this.profileInfo.teacher_id,
      'name':form.name,
      'email':form.email
    };

      this.editStudentService.postUpdateStudent(data).then(() => {

        this.initializeForm();

      }).catch((err) => {
    });

  }
}
