import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';
    isLoading: boolean = false;

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
            this.errorMessage = 'Por favor, completa todos los campos requeridos';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const usuario = {
            nombre: this.registerForm.get('nombre')?.value,
            correo: this.registerForm.get('correo')?.value,
            password: this.registerForm.get('password')?.value,
            departamentoNombre: this.registerForm.get('departamentoNombre')?.value || null
        };

        console.log('Enviando registro:', usuario);

        this.authService.register(usuario).subscribe({
            next: (response: string) => {
                console.log('Respuesta del servidor:', response);
                this.isLoading = false;
                this.successMessage = response || 'Usuario registrado exitosamente. Esperando aprobación del administrador.';

                // Limpiar el formulario
                this.registerForm.reset();

                // Redirigir al login después de 3 segundos
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 3000);
            },
            error: (error: any) => {
                console.error('Error en registro:', error);
                this.isLoading = false;

                if (error.error) {
                    if (typeof error.error === 'string') {
                        this.errorMessage = error.error;
                    } else if (error.error.mensaje) {
                        this.errorMessage = error.error.mensaje;
                    } else {
                        this.errorMessage = 'Error al registrar usuario. Intenta nuevamente.';
                    }
                } else {
                    this.errorMessage = 'Error de conexión. Verifica que el servidor esté corriendo.';
                }
            }
        });
    }
}