import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SessionService, AuthEventService, MovementService } from '../core/services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'movements-cmp',
    moduleId: module.id,
    templateUrl: 'movements.component.html'
})

export class MovementComponent implements OnInit {
    movement = null;
    loading = true;
    loadingMovement = true;
    startRequested = false;;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private movementService: MovementService,
        private authEventService: AuthEventService,
        private sessionService: SessionService) { }

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
                this.startRequested = true;
            },
            error => {
                this.startRequested = false;
            });
    }
}
