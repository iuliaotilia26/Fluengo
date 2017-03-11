/**
 * Created by Iulia Mustea on 10/26/2016.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare const $: any;

@Injectable()

export class TeachersService{
  constructor(){}

  getTeachers(language: string, location: string):Observable<any> {

    var subject = new Subject<any>();
    var searchParams={};
    if(language) searchParams.language=language;
    if(location) searchParams.location=location;

    $.get('/api/card',searchParams).done(function (res) {
      subject.next(res);
      subject.complete();
    }).fail(function() {
      subject.error("Could not load profile");
    });

    return subject;
  }
}
