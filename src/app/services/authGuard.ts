/**
 * Created by Iulia Mustea on 12/13/2016.
 */
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    console.log('I am canActivate');
    return new Promise((res, rej) => {


      this.loginService.getLogin()
        .subscribe((login) => {

          if (login === null) {
            this.router.navigate(['home']);
            return res(false);
          }
          return res(true);
        });

    });

    /*return new Promise((res) => setTimeout(() => res(false), 50));*/
  }
}

