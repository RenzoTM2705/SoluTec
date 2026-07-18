import { Routes } from '@angular/router';

import { LoginComponent } from '../app/features/login/login.component';
import { AdminDashboardComponent } from '../app/features/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { EmployeeDashboardComponent } from '../app/features/employee-dashboard/employee-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard'; 
import { EmployeeIncidentCreateComponent } from './features/employee-incident-create/employee-incident-create.component';
import { IncidentClassificationComponent } from '../app/features/employee-incident/incident-classification/incident-classification-component';
import { RegisterComponent } from '../app/features/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },

    // ---------------------------------------------------
    // PANEL ADMINISTRADOR
    // ---------------------------------------------------
    { 
        path: 'admin-dashboard', 
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'SOPORTE'] }
    },

    // ---------------------------------------------------
    // PANEL EMPLEADO (Dashboard principal del empleado)
    // ---------------------------------------------------
    { 
        path: 'employee', 
        component: EmployeeDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EMPLEADO'] } 
    },
    
    // Sub-ruta para crear incidencias
    { 
        path: 'incident-create', 
        component: EmployeeIncidentCreateComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EMPLEADO', 'ADMIN'] } 
    },

    // ---------------------------------------------------
    // PANEL SOPORTE (Clasificación)
    // ---------------------------------------------------
    {
        path: 'incident-classification',
        component: IncidentClassificationComponent,
        canActivate: [AuthGuard],
        data: { roles: ['SOPORTE', 'ADMIN'] }
    },

    // ---------------------------------------------------
    // RUTA COMODÍN (OBLIGATORIO AL FINAL)
    // ---------------------------------------------------
    {
        path: '**',
        redirectTo: '/login'
    }
];