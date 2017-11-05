import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthEventService } from './authEvent.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private event: AuthEventService) { }

  login(username: string, password: string) {
    var url = "https://movi-api.herokuapp.com"

    return this.http.post(url + '/users/login', { username: username, password: password })
      .map((response: Response) => {
        let currentUser = response.json().user;
        let token = response.json().token;
        if (currentUser && token) {
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.event.logout();
    console.log('logout called');
  }
}