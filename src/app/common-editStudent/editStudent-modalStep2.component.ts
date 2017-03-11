/**
 * Created by Iulia Mustea on 1/26/2017.
 */
import {Component, ViewEncapsulation, ChangeDetectorRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
//noinspection TypeScriptCheckImport
import { Uploader }      from 'angular2-http-file-upload';
import {MyUploadItemStudent} from "./myUploadItem";


@Component({
  selector: 'edit-modalStep2',
  templateUrl: 'editStudent-modalStep2.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditStudentStep2Component implements OnInit {


  formEditImage: FormGroup;

  @Output() onSubmitted2 = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,public toastr: ToastsManager, public uploaderService: Uploader)
  {

  }

  ngOnInit() {
    this.initializeForm();
  }


  private initializeForm() {

    this.formEditImage = this.formBuilder.group({

    });

  }
  onSubmit() {

    this.onSubmitted2.emit(true);

    let uploadFile = (<HTMLInputElement>window.document.getElementById('imageFile')).files[0];

    let myUploadItemStudent = new MyUploadItemStudent(uploadFile);

    this.uploaderService.onSuccessUpload = (response, status) => {
      // success callback
      this.toastr.success('Profile picture updated!', 'Success!');
    };
    this.uploaderService.onError = ( response, status) => {
      // error callback
      this.toastr.error('Profile picture not updated!', 'Fail!');
    };

    this.uploaderService.upload(myUploadItemStudent);

  }
}
