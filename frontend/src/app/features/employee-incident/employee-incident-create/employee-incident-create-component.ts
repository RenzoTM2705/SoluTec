import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-incident-create',
  standalone: true,
  template: `
    <div class="container-fluid min-vh-100 py-4" style="background:#f0f4f0;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-7">

            <div class="card shadow-sm border-0">

              <div class="card-header d-flex justify-content-between align-items-center">

                <h4 class="mb-0 fw-bold text-success">
                  <i class="bi bi-pencil-square me-2"></i>
                  Registrar Incidencia
                </h4>

                <button
                  class="btn btn-outline-secondary"
                  (click)="goBack()">

                  <i class="bi bi-arrow-left me-2"></i>
                  Volver

                </button>

              </div>

              <div class="card-body">

                <form>

                  <div class="mb-3">

                    <label class="form-label">
                      Título
                    </label>

                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ej: No puedo acceder al sistema"
                    >

                  </div>

                  <div class="mb-3">

                    <label class="form-label">
                      Descripción
                    </label>

                    <textarea
                      rows="5"
                      class="form-control"
                      placeholder="Describe el problema detalladamente..."
                    ></textarea>

                  </div>

                  <div class="mb-3">

                    <label class="form-label">
                      Área afectada
                    </label>

                    <input
                      type="text"
                      class="form-control"
                      placeholder="Ej: Recursos Humanos"
                    >

                  </div>

                  <button
                    class="btn btn-success btn-lg w-100 mt-3"
                    type="submit">

                    <i class="bi bi-send me-2"></i>
                    Enviar Incidencia

                  </button>

                </form>

                <hr>

                <div class="alert alert-info">

                  <strong>
                    Estado inicial:
                  </strong>

                  Pendiente de clasificación

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
export class EmployeeIncidentCreateComponent {

  constructor(private router: Router){}

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}