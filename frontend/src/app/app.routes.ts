import { Routes } from '@angular/router';

import { LoginComponent } from '../app/features/login/login.component';
import { AdminDashboardComponent } from '../app/features/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';

import { EmployeeIncidentCreateComponent } from '../app/features/employee-incident/employee-incident-create/employee-incident-create-component';
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
        path: 'admin-dashboard',
        component: AdminDashboardComponent
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
        path: '**',
        redirectTo: '/login'
    }

];
