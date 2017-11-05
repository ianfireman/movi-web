import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SessionService, AuthEventService } from '../core/services/index';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'patients', title: 'Pacientes', icon: 'ti-user', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    currentUser = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private authEventService: AuthEventService,
        private sessionService: SessionService) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.checkUser();
        this.authEventService.getEmittedValue().subscribe(d => {
            this.checkUser();
        });
    }

    checkUser() {
        if (this.sessionService.active()) {
            this.currentUser = this.sessionService.getCurrentUser();
        } else {
            this.currentUser = null;
        }
    }

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/user']);
        
    }

}
