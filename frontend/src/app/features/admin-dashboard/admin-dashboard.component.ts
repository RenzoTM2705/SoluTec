import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    template: `
    <div class="container-fluid min-vh-100 py-4" style="background: #f0f4f0;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card shadow-sm border-0">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0 fw-bold text-primary-green">
                  <i class="bi bi-shield-lock me-2"></i>Panel Administrador
                </h4>
              </div>
              
              <div class="card-body">
                <div class="row g-4 mb-4">
                  <div class="col-md-4">
                    <div class="stat-card">
                      <i class="bi bi-people icon"></i>
                      <div class="number">12</div>
                      <div class="label">Usuarios</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="stat-card">
                      <i class="bi bi-clipboard-data icon"></i>
                      <div class="number">45</div>
                      <div class="label">Incidencias</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="stat-card">
                      <i class="bi bi-clock-history icon"></i>
                      <div class="number">8</div>
                      <div class="label">Pendientes</div>
                    </div>
                  </div>
                </div>

                <div class="alert alert-info d-flex align-items-center">
                  <i class="bi bi-info-circle me-2" style="font-size: 1.25rem;"></i>
                  <div>
                    <strong>Bienvenido al panel de administración</strong>
                    <p class="mb-0">Panel de control para la gestión de usuarios e incidencias</p>
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-outline-primary" (click)="goTo('login')">
                    <i class="bi bi-arrow-left me-2"></i>Volver al Login
                  </button>
                  <button class="btn btn-success" (click)="goTo('dashboard')">
                    <i class="bi bi-speedometer2 me-2"></i>Ir a Dashboard
                  </button>
                  <button class="btn btn-outline-success" (click)="goTo('employee-incident')">
                    <i class="bi bi-clipboard-plus me-2"></i>Ir a Employee Incident
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {
    constructor(private router: Router) { }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }
}