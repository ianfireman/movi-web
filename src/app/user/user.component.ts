import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, SessionService, AuthEventService } from '../core/services/index';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    currentUser = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private authEventService: AuthEventService,
        private sessionService: SessionService) { }

    ngOnInit() {
        this.checkUser();
    }

    checkUser() {
        if (this.sessionService.active()) {
            this.currentUser = this.sessionService.getCurrentUser();
            this.router.navigate(['/patients']);
        }
    }

    login() {
        console.log(this.model.email);
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
            data => {
                this.router.navigate(['/patients']);
                this.checkUser();
                this.authEventService.login();
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
    }

    logout() {
        this.router.navigate(['/']);
        this.authenticationService.logout();
        this.authEventService.logout();
        this.currentUser = null;
    }
}
