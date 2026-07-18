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
        // 1. Guardar en localStorage EXACTAMENTE como lo pide el AuthService
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.nombre);
        localStorage.setItem('userRole', response.rol);
        
        // 2. Limpiar el rol por si viene como "ROLE_ADMIN"
        const rolLimpio = response.rol.replace('ROLE_', '').toUpperCase();

        // Dentro de tu onSubmit() en login.component.ts
        if (rolLimpio === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']); 
        } 
        else if (rolLimpio === 'EMPLEADO') {
          // Ahora sí, lo enviamos a su panel correspondiente
          this.router.navigate(['/employee']); 
        } 
        else if (rolLimpio === 'SOPORTE') {
          this.router.navigate(['/admin-dashboard']); // Redirigir a un panel de soporte si existe
        } 
        else {
          this.router.navigate(['/login']); 
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error al iniciar sesión';
        this.isLoading = false;
      }
    });
  }
}
}