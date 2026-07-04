import { Routes } from '@angular/router';
import { LoginComponent } from '../app/features/login/login.component';
import { AdminDashboardComponent } from '../app/features/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from '../app/features/dashboard/dashboard.component';
import { EmployeeIncidentComponent } from '../app/features/employee-incident/employee-incident.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'employee-incident', component: EmployeeIncidentComponent },
    { path: '**', redirectTo: '/login' }
];