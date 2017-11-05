import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthEventService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  logout() {
    this.fire.emit(false);
  }

  login() {
    this.fire.emit(true);
  }

  getEmittedValue() {
    return this.fire;
  }
}