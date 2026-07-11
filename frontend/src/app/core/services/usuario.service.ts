import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/usuarios';

  getUsuariosPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendientes`);
  }

  aprobarUsuario(id: number, rol: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/aprobar?rol=${rol}`, {});
  }

  getTodosLosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}