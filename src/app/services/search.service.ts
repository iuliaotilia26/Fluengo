import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
declare const $: any;
@Injectable()

export class SearchService {
  constructor() {
  }

  getLocations(): Observable<any> {

    var subject = new Subject<any>();

    $.get('/api/location').done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("No data");
    });

    return subject;
  }

  getLanguages(): Observable<any> {

    var subject = new Subject<any>();

    $.get('/api/language').done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("No data");
    });

    return subject;
  }
}
