/**
 * Created by Iulia Mustea on 1/26/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const $: any;

@Injectable()

export class EditStudentService {
  constructor(private http: Http) {
  }


  postUpdateStudent(data) {
    const url = '/api/editStudent';
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
