import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, PendingRegistration, RegisterRequest, RegisterResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, payload);
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, payload);
  }

  getPendingRegistrations(): Observable<PendingRegistration[]> {
    return this.http.get<PendingRegistration[]>(`${environment.apiUrl}/admin/usuarios/pendientes`);
  }

  approveRegistration(id: number): Observable<PendingRegistration> {
    return this.http.post<PendingRegistration>(`${environment.apiUrl}/admin/usuarios/${id}/aprobar`, {});
  }
}