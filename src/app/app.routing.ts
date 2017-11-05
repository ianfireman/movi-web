import { Routes } from '@angular/router';

import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { PatientsComponent }   from './patients/patients.component';
import { MovementComponent }   from './movements/movements.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'patients',
        component: TableComponent
    },
    {
        path: 'patient/:patientId',
        component: PatientsComponent
    },
    {
        path: 'movements/:movementId',
        component: MovementComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    }
]
