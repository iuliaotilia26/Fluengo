/**
 * Created by Iulia Mustea on 12/9/2016.
 */
/**
 * Created by Iulia Mustea on 11/9/2016.
 */
import {Component, ViewChild, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ModalSize} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'create-modal',
  styleUrls: [ 'createTeacher-modal.component.css' ],
  templateUrl: 'createTeacher-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateTeacherComponent {

  @ViewChild('create')
  modal: ModalComponent;

  profileInfo={};

  stepNumber : number = 1;



  constructor()
  {

  }
  close() {
    this.modal.close();
  }

  open(profileinfo) {

    this.profileInfo=profileinfo;
    this.modal.open(ModalSize.Small);
  }

  onSubmitted(agreed: boolean)
  {
    if(agreed == true) this.stepNumber ++;
  }
  onSubmitted2(agreed: boolean)
  {
    if(agreed == true) this.modal.close();
    this.stepNumber=1;
  }

}
