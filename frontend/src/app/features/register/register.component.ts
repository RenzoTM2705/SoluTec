import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../core/services/auth-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authApi = inject(AuthApiService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isSuccess = false;

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authApi.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.isSuccess = true;
          this.successMessage = response.mensaje || 'Solicitud de credenciales enviada correctamente.';
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
    }
  }
}