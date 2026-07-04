import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalAuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient-green">

      <div class="row justify-content-center w-100">

        <div class="col-11 col-sm-10 col-md-8 col-lg-6">

          <div class="card shadow-lg border-0 p-4">

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

            <!-- MENSAJES -->
            <div *ngIf="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <div *ngIf="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>

            <!-- FORM -->
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

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
                    <label class="form-label">Nombre</label>
                    <input class="form-control" formControlName="nombre">

                    <small class="text-danger"
                      *ngIf="registerForm.get('nombre')?.touched &&
                             registerForm.get('nombre')?.invalid">
                      Mínimo 3 caracteres
                    </small>
                  </div>

                  <!-- Correo -->
                  <div class="mb-3">
                    <label class="form-label">Correo</label>
                    <input type="email" class="form-control" formControlName="correo">

                    <small class="text-danger"
                      *ngIf="registerForm.get('correo')?.touched &&
                             registerForm.get('correo')?.invalid">
                      Correo inválido
                    </small>
                  </div>

                  <!-- Password -->
                  <div class="mb-3">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" formControlName="password">

                    <small class="text-danger"
                      *ngIf="registerForm.get('password')?.touched &&
                             registerForm.get('password')?.invalid">
                      Mínimo 6 caracteres
                    </small>
                  </div>

                  <!-- Departamento -->
                  <div class="mb-3">
                    <label class="form-label">Departamento</label>
                    <input class="form-control" formControlName="departamentoNombre">
                  </div>

                  <button class="btn btn-success w-100" type="submit" [disabled]="isLoading">

                    <span *ngIf="!isLoading">
                      <i class="bi bi-person-check me-2"></i>
                      Registrar Usuario
                    </span>

                    <span *ngIf="isLoading">
                      Registrando...
                    </span>

                  </button>

                  <button type="button"
                          class="btn btn-outline-secondary w-100 mt-2"
                          (click)="goToLogin()">

                    Volver al Login

                  </button>

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
        private auth: LocalAuthService,
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
            this.errorMessage = 'Completa todos los campos';
            return;
        }

        this.isLoading = true;

        const usuario = this.registerForm.value;

        this.auth.register(usuario);

        this.isLoading = false;
        this.successMessage = 'Usuario registrado correctamente';

        this.registerForm.reset();

        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 2000);
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}