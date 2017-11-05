
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {
  constructor(private http: Http) { }

  getHeaders() {
    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('token'));
    return {
      headers: headers
    };
  }

  getBaseDomain() {
    return "http://localhost:3000";
  }

}