/**
 * Created by Iulia Mustea on 11/23/2016.
 */
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const $: any;

@Injectable()

export class LoginService {

  private _onRegisterFunction;

  constructor() {
  }

  onRegister(f: Function) {
    this._onRegisterFunction = f;
  }

  register(returnUrl: string = null) {
    if (this._onRegisterFunction) {
      return this._onRegisterFunction(returnUrl);
    }
  }

  getLogin(): Observable<any> {

    var subject = new Subject<any>();


    $.get('/api/auth').done(function (res) {

      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("Could not load profile");
    });

    return subject;
  }
}
