import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncidenciaService } from '../../core/services/incidencia.service';

@Component({
  selector: 'app-employee-incident-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employee-incident-create.component.html',
  styleUrl: './employee-incident-create.component.css'
})
export class EmployeeIncidentCreateComponent {
  private fb = inject(FormBuilder);
  private incidenciaService = inject(IncidenciaService);
  private router = inject(Router);

  // Formulario reactivo (RF-09, RF-10)
  ticketForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    categoria: this.fb.group({ id: ['', Validators.required] })
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.ticketForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.incidenciaService.create(this.ticketForm.value).subscribe({
        next: () => {
          // Si es exitoso, regresamos al panel
          this.router.navigate(['/employee']);
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
    }
  }
}