/**
 * Created by Iulia Mustea on 12/20/2016.
 */
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const $: any;

@Injectable()

export class TeacherBookingsService {


  constructor() {
  }

  getBookingsTeacher(id): Observable<any> {

    var subject = new Subject<any>();


    $.get('/api/bookingPage/' + id).done(function (res) {

      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("Could not load bookings");
    });

    return subject;
  }
}
