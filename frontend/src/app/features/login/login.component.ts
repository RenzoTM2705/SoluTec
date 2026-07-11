import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../core/services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authApi = inject(AuthApiService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  isLoading = false;
  errorMessage = '';

onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authApi.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          // 1. Guardamos el token en localStorage para mantener la sesión abierta
          localStorage.setItem('token', response.token);
          
          // Opcional: Puedes guardar datos del usuario si los necesitas mostrar en el Navbar
          localStorage.setItem('userName', response.nombre);
          localStorage.setItem('userRole', response.rol);
          
          // 2. Redirección basada en el rol que nos envía Spring Boot (RF-07)
          if (response.rol === 'ADMIN' || response.rol === 'SOPORTE') {
             this.router.navigate(['/admin']);
          } else if (response.rol === 'EMPLEADO') {
             this.router.navigate(['/employee']); // Esto dispara la ruta que configuramos en app.routes.ts
          } else {
             // Si por alguna razón tiene otro rol no contemplado
             this.router.navigate(['/']); 
          }
          
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
    }
  }
}