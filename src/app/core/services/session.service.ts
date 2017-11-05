import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {
  constructor(private http: Http) { }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  active() {
    if (localStorage.getItem('currentUser') && localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}