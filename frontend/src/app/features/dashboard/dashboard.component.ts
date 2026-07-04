import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="container-fluid min-vh-100 py-4" style="background: #f0f4f0;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10">
            <div class="card shadow-sm border-0">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0 fw-bold text-success">
                  <i class="bi bi-speedometer2 me-2"></i>Dashboard Soporte
                </h4>
              </div>
              
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Incidencia</th>
                        <th>Estado</th>
                        <th>Prioridad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#001</td>
                        <td>No enciende PC</td>
                        <td><span class="badge bg-warning">Pendiente</span></td>
                        <td><span class="badge bg-danger">Alta</span></td>
                      </tr>
                      <tr>
                        <td>#002</td>
                        <td>Correo no funciona</td>
                        <td><span class="badge bg-info">En Proceso</span></td>
                        <td><span class="badge bg-warning">Media</span></td>
                      </tr>
                      <tr>
                        <td>#003</td>
                        <td>Impresora bloqueada</td>
                        <td><span class="badge bg-success">Resuelto</span></td>
                        <td><span class="badge bg-secondary">Baja</span></td>
                      </tr>
                      <tr>
                        <td>#004</td>
                        <td>Error en sistema</td>
                        <td><span class="badge bg-danger">Crítico</span></td>
                        <td><span class="badge bg-danger">Crítica</span></td>
                      </tr>
                      <tr>
                        <td>#005</td>
                        <td>VPN fallando</td>
                        <td><span class="badge bg-warning">Pendiente</span></td>
                        <td><span class="badge bg-danger">Alta</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-footer bg-transparent border-0 p-3">
                <div class="d-grid gap-2">
                  <button class="btn btn-outline-primary" (click)="goTo('login')">
                    <i class="bi bi-arrow-left me-2"></i>Volver al Login
                  </button>
                  <button class="btn btn-primary" (click)="goTo('admin-dashboard')">
                    <i class="bi bi-shield-lock me-2"></i>Ir a Admin Dashboard
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
export class DashboardComponent {
  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}