import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient-green">

      <div class="row justify-content-center w-100">

        <div class="col-11 col-sm-10 col-md-8 col-lg-6">

          <div class="card shadow-lg border-0 p-4">

            <!-- Encabezado -->
            <div class="text-center mb-4">

              <div class="logo-icon mx-auto">
                <i class="bi bi-person-plus-fill"></i>
              </div>

              <h1 class="display-6 fw-bold text-primary-green">
                Registro de Usuario
              </h1>

              <p class="text-secondary-gray">
                Solicita acceso al sistema
              </p>

            </div>

            <!-- Mensajes -->
            <div
              *ngIf="errorMessage"
              class="alert alert-danger">

              {{errorMessage}}

            </div>

            <div
              *ngIf="successMessage"
              class="alert alert-success">

              {{successMessage}}

            </div>

            <!-- Formulario -->
            <form
              [formGroup]="registerForm"
              (ngSubmit)="onSubmit()">

              <div class="card border">

                <div class="card-header">
                  <h5 class="mb-0">

                    <i class="bi bi-person me-2"></i>
                    Datos del usuario

                  </h5>
                </div>

                <div class="card-body">

                  <!-- Nombre -->
                  <div class="mb-3">

                    <label class="form-label">
                      Nombre
                    </label>

                    <input
                      type="text"
                      class="form-control"
                      formControlName="nombre"
                      placeholder="Nombre completo">

                    <small
                      class="text-danger"
                      *ngIf="registerForm.get('nombre')?.touched &&
                             registerForm.get('nombre')?.invalid">

                      Mínimo 3 caracteres

                    </small>

                  </div>

                  <!-- Correo -->
                  <div class="mb-3">

                    <label class="form-label">
                      Correo
                    </label>

                    <input
                      type="email"
                      class="form-control"
                      formControlName="correo"
                      placeholder="correo@empresa.com">

                    <small
                      class="text-danger"
                      *ngIf="registerForm.get('correo')?.touched &&
                             registerForm.get('correo')?.invalid">

                      Correo inválido

                    </small>

                  </div>

                  <!-- Password -->
                  <div class="mb-3">

                    <label class="form-label">
                      Contraseña
                    </label>

                    <input
                      type="password"
                      class="form-control"
                      formControlName="password"
                      placeholder="********">

                    <small
                      class="text-danger"
                      *ngIf="registerForm.get('password')?.touched &&
                             registerForm.get('password')?.invalid">

                      Mínimo 6 caracteres

                    </small>

                  </div>

                  <!-- Departamento -->
                  <div class="mb-3">

                    <label class="form-label">
                      Departamento
                    </label>

                    <input
                      type="text"
                      class="form-control"
                      formControlName="departamentoNombre"
                      placeholder="Ej: Sistemas">

                  </div>

                  <!-- Botones -->
                  <div class="d-grid gap-2">

                    <button
                      type="submit"
                      class="btn btn-success"
                      [disabled]="isLoading">

                      <span *ngIf="!isLoading">
                        <i class="bi bi-person-check me-2"></i>
                        Registrar Usuario
                      </span>

                      <span *ngIf="isLoading">

                        <span
                          class="spinner-border spinner-border-sm me-2">
                        </span>

                        Registrando...

                      </span>

                    </button>

                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      (click)="goToLogin()">

                      <i class="bi bi-arrow-left me-2"></i>
                      Volver al Login

                    </button>

                  </div>

                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
    `
})
export class RegisterComponent {

    registerForm: FormGroup;
    errorMessage = '';
    successMessage = '';
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {

        this.registerForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            correo: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            departamentoNombre: ['']
        });

    }

    onSubmit(): void {

        if (this.registerForm.invalid) {
            this.errorMessage =
                'Por favor, completa todos los campos requeridos';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const usuario = {
            nombre: this.registerForm.get('nombre')?.value,
            correo: this.registerForm.get('correo')?.value,
            password: this.registerForm.get('password')?.value,
            departamentoNombre:
                this.registerForm.get('departamentoNombre')?.value || null
        };

        this.authService.register(usuario)
            .subscribe({

                next: (response: string) => {

                    this.isLoading = false;

                    this.successMessage =
                        response ||
                        'Usuario registrado exitosamente. Esperando aprobación del administrador.';

                    this.registerForm.reset();

                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 3000);

                },

                error: (error: any) => {

                    this.isLoading = false;

                    if (error.error) {

                        if (typeof error.error === 'string') {
                            this.errorMessage = error.error;
                        }
                        else if (error.error.mensaje) {
                            this.errorMessage = error.error.mensaje;
                        }
                        else {
                            this.errorMessage =
                                'Error al registrar usuario';
                        }

                    } else {

                        this.errorMessage =
                            'Error de conexión con el servidor';

                    }
                }
            });
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }

}