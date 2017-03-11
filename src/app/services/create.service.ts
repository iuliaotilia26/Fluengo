/**
 * Created by Iulia Mustea on 12/9/2016.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const $: any;

@Injectable()

export class CreateTeacherService {
  constructor(private http: Http) {
  }


  postCreateTeacher(data) {
    const url = '/api/create';
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

  postUpdateTeacher(data){

    const url = '/api/update';
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
