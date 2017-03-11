import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const $: any;

@Injectable()

export class TeacherService {
  constructor(private http: Http) {
  }

  getProfile(id): Observable<any> {

    const subject = new Subject<any>();

    $.get('/api/teacher/' + id).done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("Could not load profile");
    });

    return subject;
  }

  getMoreProfiles(id): Observable<any> {

    const subject = new Subject<any>();

    $.get('/api/teacher/similar/' + id).done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function () {
      subject.error("Could not load profile");
    });
    return subject;
  }

  postBookTeacher(data) {
    const url = '/api/book';
    return this.http.post(url, data)
      .toPromise().then(response => {
        let parsedResponse = <any> response.json();
        if (parsedResponse.status === 404 || parsedResponse.IsSuccessful === false) {
          return Promise.reject(new Error(parsedResponse.Payload.Message));
        } else if (parsedResponse.IsSuccessful) {
          return Promise.resolve();
        }
      });
  }


}
