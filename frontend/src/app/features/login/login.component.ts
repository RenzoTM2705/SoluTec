import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalAuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient-green">

      <div class="row justify-content-center w-100">

        <div class="col-11 col-sm-10 col-md-8 col-lg-6">

          <div class="card shadow-lg border-0 login-card p-4">

            <!-- Encabezado -->
            <div class="text-center mb-4">

              <div class="logo-icon mx-auto">
                <i class="bi bi-shield-check"></i>
              </div>

              <h1 class="display-6 fw-bold text-primary-green">
                Solutec
              </h1>

              <p class="text-secondary-gray">
                Sistema de Gestión de Incidencias
              </p>

            </div>

            <!-- LOGIN -->
            <div class="card border mb-4">

              <div class="card-header">
                <h5 class="mb-0">
                  <i class="bi bi-box-arrow-in-right me-2"></i>
                  Iniciar sesión
                </h5>
              </div>

              <div class="card-body">

                <div class="mb-3">

                  <label class="form-label">Correo</label>

                  <input
                    type="email"
                    class="form-control"
                    [(ngModel)]="loginData.email"
                    placeholder="ejemplo@solutec.com">

                </div>

                <div class="mb-3">

                  <label class="form-label">Contraseña</label>

                  <input
                    type="password"
                    class="form-control"
                    [(ngModel)]="loginData.password"
                    placeholder="********">

                </div>

                <button
                  class="btn btn-primary w-100"
                  (click)="login()">

                  <i class="bi bi-box-arrow-in-right me-2"></i>
                  Iniciar sesión

                </button>

                <div *ngIf="error" class="text-danger mt-2">
                  {{ error }}
                </div>

              </div>

            </div>

            <!-- REGISTRO -->
            <div class="card border mb-4">

              <div class="card-header">
                <h5 class="mb-0">
                  <i class="bi bi-person-plus me-2"></i>
                  ¿No tienes cuenta?
                </h5>
              </div>

              <div class="card-body text-center">

                <p class="text-muted">
                  Registra un nuevo usuario para el sistema
                </p>

                <button
                  class="btn btn-success w-100"
                  (click)="goTo('register')">

                  <i class="bi bi-person-plus me-2"></i>
                  Registrar usuario

                </button>

              </div>

            </div>

            <!-- BOTONES -->
            <div class="d-grid gap-3 mt-3">

              <button class="btn btn-primary btn-lg"
                      (click)="goTo('admin-dashboard')">

                <i class="bi bi-shield-lock me-2"></i>
                Panel Administrador

              </button>

              <button class="btn btn-success btn-lg"
                      (click)="goTo('dashboard')">

                <i class="bi bi-speedometer2 me-2"></i>
                Panel Soporte

              </button>

              <button class="btn btn-outline-primary btn-lg"
                      (click)="goTo('incident-create')">

                <i class="bi bi-clipboard-plus me-2"></i>
                Registrar Incidencia

              </button>

              <button class="btn btn-outline-warning btn-lg"
                      (click)="goTo('incident-classification')">

                <i class="bi bi-tags me-2"></i>
                Clasificar Incidencia

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
    `
})
export class LoginComponent {

    loginData = {
        email: '',
        password: ''
    };

    error = '';

    constructor(
        private router: Router,
        private auth: LocalAuthService
    ) {}

    login() {

        const ok = this.auth.login(
            this.loginData.email,
            this.loginData.password
        );

        if (ok) {
            this.router.navigate(['/admin-dashboard']);
        } else {
            this.error = 'Credenciales incorrectas';
        }
    }

    goTo(route: string) {
        this.router.navigate([`/${route}`]);
    }
}