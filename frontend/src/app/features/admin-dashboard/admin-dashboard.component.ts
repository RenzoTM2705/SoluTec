import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container-fluid min-vh-100 py-4" style="background: #f0f4f0;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card shadow-sm border-0">

              <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0 fw-bold text-primary-green">
                  <i class="bi bi-shield-lock me-2"></i>
                  Panel Administrador
                </h4>
              </div>

              <div class="card-body">

                <!-- Estadísticas -->
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

                <!-- Mensaje -->
                <div class="alert alert-info d-flex align-items-center mb-4">
                  <i class="bi bi-info-circle me-2" style="font-size:1.25rem"></i>
                  <div>
                    <strong>Bienvenido al panel de administración</strong>
                    <p class="mb-0">
                      Panel de control para la gestión de usuarios e incidencias
                    </p>
                  </div>
                </div>

                <!-- NUEVA SECCIÓN -->
                <div class="card border mb-4">
                  <div class="card-header bg-light">
                    <h5 class="mb-0">
                      <i class="bi bi-person-plus-fill me-2"></i>
                      Usuarios pendientes de autorización
                    </h5>
                  </div>

                  <div class="card-body">

                    <div *ngFor="let user of pendingUsers"
                         class="border rounded p-3 mb-3">

                      <div class="d-flex justify-content-between align-items-center">

                        <div>
                          <h6 class="mb-1">{{user.name}}</h6>
                          <small class="text-muted">
                            {{user.email}}
                          </small>

                          <div class="mt-2">
                            <span class="badge bg-secondary">
                              Rol: {{user.role}}
                            </span>
                          </div>
                        </div>

                        <div class="d-flex gap-2">

                          <button
                            class="btn btn-success"
                            (click)="authorizeUser(user)">
                            <i class="bi bi-check-circle me-1"></i>
                            Autorizar
                          </button>

                          <button
                            class="btn btn-warning"
                            (click)="assignRole(user)">
                            <i class="bi bi-person-gear me-1"></i>
                            Asignar rol
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>

                <!-- Navegación -->
                <div class="d-grid gap-2">
                  <button class="btn btn-outline-primary"
                          (click)="goTo('login')">
                    <i class="bi bi-arrow-left me-2"></i>
                    Volver al Login
                  </button>

                  <button class="btn btn-success"
                          (click)="goTo('dashboard')">
                    <i class="bi bi-speedometer2 me-2"></i>
                    Ir a Dashboard
                  </button>

                  <button class="btn btn-outline-success"
                          (click)="goTo('employee-incident')">
                    <i class="bi bi-clipboard-plus me-2"></i>
                    Ir a Employee Incident
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

    pendingUsers = [
        {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan.perez@empresa.com',
            role: 'Sin asignar'
        }
    ];

    constructor(private router: Router) { }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }

    authorizeUser(user: any) {
        alert(`${user.name} autorizado correctamente`);
    }

    assignRole(user: any) {

        const newRole = prompt(
            `Asignar rol a ${user.name}`,
            'Empleado'
        );

        if (newRole) {
            user.role = newRole;
        }
    }
}