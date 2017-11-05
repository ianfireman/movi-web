import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { PatientsComponent }   from './patients/patients.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MovementComponent }   from './movements/movements.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthenticationService, SessionService, AuthEventService, MovementService, ConfigService} from './core/services'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    PatientsComponent,
    TableComponent,
    MovementComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FormsModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'})

  ],
  providers: [AuthenticationService, SessionService, AuthEventService, MovementService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
