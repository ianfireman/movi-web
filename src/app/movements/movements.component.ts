import { Component, OnInit, NgZone } from '@angular/core';
import { AuthenticationService, SessionService, AuthEventService, MovementService } from '../core/services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { EventSourcePolyfill } from 'ng-event-source';
import * as Chartist from 'chartist';

import { ChartType, ChartEvent } from './chart.component';

export interface LiveData {
    labels: string[];
    series: Array<Array<number>>;
}

@Component({
    selector: 'movements-cmp',
    moduleId: module.id,
    templateUrl: 'movements.component.html'
})

export class MovementComponent implements OnInit {
    data: LiveData;
    type: ChartType

    movement = null;
    loading = true;
    started = false;
    time = 0;
    loadingMovement = true;
    startRequested = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private movementService: MovementService,
        private authEventService: AuthEventService,
        private zone: NgZone,
        private sessionService: SessionService) {
        this.data = {
            labels: [],
            series: []
        };

        this.type = 'Line';
        
        let eventSource = new EventSourcePolyfill('http://localhost:9090');

        eventSource.onmessage = (data => {
            this.zone.run(() => {
                let arrayData = data.data.split(',');
                this.started = true;
                this.time = Number(arrayData[1]);
                console.log(arrayData);
                if(this.data.labels.length < 40) {
                    this.data.labels.push("");
                }
                if(!this.data.series[0]) {
                    this.data.series.push([Number(arrayData[0])]);
                } else {
                    this.data.series[0].push(Number(arrayData[0]));
                }
                if( this.data.series[0].length > 40) {
                    this.data.series[0].shift();
                }
                this.data = Object.assign({}, this.data);
            });
        });
    }

    ngOnInit() {
        let movementId = this.route.snapshot.params['movementId'];
        this.movementService.getMovement(movementId).subscribe(
            data => {
                console.log(data);
                this.movement = data;
                this.loadingMovement = false;
            },
            error => {
                this.loadingMovement = false;
            });

    }

    startMovement() {
        this.movementService.startMovement(this.movement.movementId, this.movement.patient).subscribe(
            data2 => {
                console.log(data2);
                this.startRequested = true;
            },
            error => {
                this.startRequested = false;
            });
    }

    stopMovement() {
        this.movementService.stopMovement(this.movement.movementId, this.movement.patient).subscribe(
            data2 => {
                console.log(data2);
                this.started = false;
            },
            error => {
                this.startRequested = false;
            });
    }
}
