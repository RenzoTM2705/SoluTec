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

    { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'SOPORTE'] } // Ambos pueden entrar aquí
    },

    {
        path: 'dashboard',
        component: DashboardComponent
    },

    {
        path: 'incident-create',
        component: EmployeeIncidentCreateComponent
    },

    {
        path: 'incident-classification',
        component: IncidentClassificationComponent
    },

    { 
        path: 'employee', 
        component: EmployeeDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['EMPLEADO'] } // Tu AuthGuard leerá esto para permitir o denegar el paso
    },

    { 
    path: 'employee/nueva-incidencia', 
    component: EmployeeIncidentCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EMPLEADO'] }
  },

    {
        path: '**',
        redirectTo: '/login'
    }

];
