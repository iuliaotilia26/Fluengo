/**
 * Created by Iulia Mustea on 12/7/2016.
 */
import {Component, ViewChild, OnInit, ViewEncapsulation} from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ModalSize} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'signin-modal',
  templateUrl: 'signin-modal.component.html',
  styleUrls: ['signin-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInModalComponent implements OnInit {

  private _returnUrl: string = null;

  @ViewChild('signInModal')
  signInModal: ModalComponent;


  constructor() {
  }

  close() {
    this.signInModal.close();
    //window.location.href = '/api/auth/facebook?returnUrl=' + encodeURIComponent('/teacher/' + this.teacherId + ';book=1');
  }

  open(returnUrl: string = null) {
    this._returnUrl = returnUrl;
    this.signInModal.open(ModalSize.Small);
  }

  ngOnInit() {
  }

  facebookSignIn(){

    if(!this._returnUrl) {
      window.location.href = '/api/auth/facebook';
    }
    else {
      window.location.href = '/api/auth/facebook?returnUrl=' + encodeURIComponent(this._returnUrl);
    }

  }

  twitterSignIn(){

    if(!this._returnUrl) {
      window.location.href = '/api/auth/twitter';
    }
    else {
      window.location.href = '/api/auth/twitter?returnUrl=' + encodeURIComponent(this._returnUrl);
    }

  }
  googleSignIn(){

    if(!this._returnUrl) {
      window.location.href = '/api/auth/google';
    }
    else {
      window.location.href = '/api/auth/google?returnUrl=' + encodeURIComponent(this._returnUrl);
    }

  }
  windowsSignIn(){

    if(!this._returnUrl) {
      window.location.href = '/api/auth/windowslive';
    }
    else {
      window.location.href = '/api/auth/windowslive?returnUrl=' + encodeURIComponent(this._returnUrl);
    }

  }

}
