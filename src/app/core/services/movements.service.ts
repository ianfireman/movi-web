import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthEventService } from './authEvent.service';
import { ConfigService } from './config.service';

@Injectable()
export class MovementService {
  constructor(private http: Http, private event: AuthEventService, private configService: ConfigService) { }
  url = this.configService.getBaseDomain();

  getMovement(movementId) {
    return this.http.get(this.url + '/movements/' + movementId, this.configService.getHeaders())
      .map((response: Response) => {
        return response.json();
      });
  } 

  startMovement(patientId, movementId) {
    return this.http.get(this.url + '/patients/' + patientId + '/startMovement/' + movementId, this.configService.getHeaders())
      .map((response: Response) => {
        return response;
      });
  }

  stopMovement(patientId, movementId) {
    return this.http.get(this.url + '/patients/' + patientId + '/stopMovement/' + movementId, this.configService.getHeaders())
      .map((response: Response) => {
          return response;
      });
  }
}