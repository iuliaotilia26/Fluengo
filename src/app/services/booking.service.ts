/**
 * Created by Iulia Mustea on 11/16/2016.
 */
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LoginService} from "./login.service";

declare const $: any;

@Injectable()

export class BookingService {

  constructor(private http:Http) {
  }

  getInformationsStudent(id): Observable<any> {

    var subject = new Subject<any>();

    $.get('/api/booking/student/' + id).done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("Could not display informations");
    });

    return subject;
  }

  getInformationsTeacher(id): Observable<any> {

    var subject = new Subject<any>();

    $.get('/api/booking/teacher/' + id).done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("Could not display informations");
    });

    return subject;
  }

  changeStatus(id,newStatus): Promise<any>
  {
    let url =`/api/booking/teacher/${id}/${newStatus}`;
    return this.http.post(url, newStatus)
      .toPromise().then(response => {
        return <any> response.json();
      });

  }
  cancelStudent(id):Promise<any>
  {
    let url =`/api/booking/student/${id}/cancel`;
    return this.http.post(url)
      .toPromise().then(response => {
        return <any> response.json();
      });
  }

}


