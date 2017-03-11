/**
 * Created by Iulia Mustea on 1/26/2017.
 */
import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ModalSize} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'edit-modal',
  styleUrls: [ 'editStudent-modal.component.css' ],
  templateUrl: 'editStudent-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditStudentComponent {

  @ViewChild('edit')
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
