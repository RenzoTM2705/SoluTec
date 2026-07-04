import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-incident',
  standalone: true,
  template: `
    <div class="container-fluid min-vh-100 py-4" style="background: #f0f4f0;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-7 col-xl-6">
            <div class="card shadow-sm border-0">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0 fw-bold text-primary-green">
                  <i class="bi bi-clipboard-plus me-2"></i>Crear Incidencia
                </h4>
              </div>
              
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="form-label">Título</label>
                    <input type="text" class="form-control" placeholder="Ej: Problema con el sistema">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <textarea class="form-control" rows="4" placeholder="Describe el problema detalladamente..."></textarea>
                  </div>
                  
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">Prioridad</label>
                      <select class="form-select">
                        <option value="">Seleccionar...</option>
                        <option value="baja">Baja</option>
                        <option value="media" selected>Media</option>
                        <option value="alta">Alta</option>
                        <option value="critica">Crítica</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Categoría</label>
                      <select class="form-select">
                        <option value="">Seleccionar...</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="red">Red</option>
                        <option value="correo">Correo</option>
                        <option value="acceso">Acceso</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" class="btn btn-success btn-lg w-100 mt-4">
                    <i class="bi bi-send me-2"></i>Crear Incidencia
                  </button>
                </form>

                <hr class="my-4">

                <div class="alert alert-info d-flex align-items-center">
                  <i class="bi bi-info-circle me-2" style="font-size: 1.25rem;"></i>
                  <div>
                    <strong>Crear nueva incidencia</strong>
                    <p class="mb-0">Completa los campos para reportar un problema</p>
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-outline-primary" (click)="goTo('login')">
                    <i class="bi bi-arrow-left me-2"></i>Volver al Login
                  </button>
                  <button class="btn btn-primary" (click)="goTo('admin-dashboard')">
                    <i class="bi bi-shield-lock me-2"></i>Ir a Admin Dashboard
                  </button>
                  <button class="btn btn-success" (click)="goTo('dashboard')">
                    <i class="bi bi-speedometer2 me-2"></i>Ir a Dashboard
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
export class EmployeeIncidentComponent {
  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}