import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient-green">
      <div class="row justify-content-center w-100">
        <div class="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">
          <div class="card shadow-lg border-0 login-card">
            <div class="text-center">
              <div class="logo-icon mx-auto">
                <i class="bi bi-shield-check"></i>
              </div>
              <h1 class="display-5 fw-bold text-primary-green mb-1">Solutec</h1>
              <p class="text-secondary-gray mb-4">Sistema de Gestión de Incidencias</p>
            </div>
            
            <div class="d-grid gap-3 mt-3">
              <button class="btn btn-primary btn-lg py-3" (click)="goTo('admin-dashboard')">
                <i class="bi bi-shield-lock me-2"></i>Panel Administrador
              </button>
              <button class="btn btn-success btn-lg py-3" (click)="goTo('dashboard')">
                <i class="bi bi-speedometer2 me-2"></i>Panel Soporte
              </button>
              <button class="btn btn-outline-primary btn-lg py-3" (click)="goTo('employee-incident')">
                <i class="bi bi-clipboard-plus me-2"></i>Crear Incidencia
              </button>
            </div>
            
            <div class="mt-4 pt-3 border-top text-center">
              <small class="text-secondary-gray">
                <i class="bi bi-info-circle me-1"></i>
                Acceso sin autenticación
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
    constructor(private router: Router) { }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }
}