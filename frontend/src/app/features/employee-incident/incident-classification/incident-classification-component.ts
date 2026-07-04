import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-classification',
  standalone: true,
  template: `
    <div class="container-fluid min-vh-100 py-4" style="background:#f8f9fa;">

      <div class="container">

        <div class="row justify-content-center">

          <div class="col-12 col-lg-7">

            <div class="card shadow border-0">

              <div class="card-header d-flex justify-content-between align-items-center">

                <h4 class="mb-0 text-primary fw-bold">

                  <i class="bi bi-tags me-2"></i>
                  Clasificar Incidencia

                </h4>

                <button
                  class="btn btn-outline-secondary"
                  (click)="goBack()">

                  <i class="bi bi-arrow-left me-2"></i>
                  Volver

                </button>

              </div>

              <div class="card-body">

                <div class="mb-4">

                  <h5>
                    Problema con acceso al sistema
                  </h5>

                  <p class="text-muted">

                    El usuario reporta que no puede ingresar
                    al sistema desde esta mañana.

                  </p>

                </div>

                <form>

                  <div class="mb-3">

                    <label class="form-label">
                      Categoría
                    </label>

                    <select class="form-select">

                      <option>Seleccionar...</option>
                      <option>Hardware</option>
                      <option>Software</option>
                      <option>Red</option>
                      <option>Correo</option>
                      <option>Acceso</option>

                    </select>

                  </div>

                  <div class="mb-3">

                    <label class="form-label">
                      Prioridad
                    </label>

                    <select class="form-select">

                      <option>Seleccionar...</option>
                      <option>Baja</option>
                      <option>Media</option>
                      <option>Alta</option>
                      <option>Crítica</option>

                    </select>

                  </div>

                  <div class="mb-3">

                    <label class="form-label">
                      Comentario técnico
                    </label>

                    <textarea
                      rows="4"
                      class="form-control"
                      placeholder="Agregar observaciones..."
                    ></textarea>

                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary w-100 btn-lg">

                    <i class="bi bi-check-circle me-2"></i>
                    Clasificar Incidencia

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  `
})
export class IncidentClassificationComponent {

  constructor(private router: Router){}

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}