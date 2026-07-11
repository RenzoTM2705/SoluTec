import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/incidencias';

  // Obtener todas las incidencias
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva incidencia
  create(incidencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, incidencia);
  }

  // Actualizar el estado de una incidencia
  actualizarEstado(id: number, nuevoEstado: string, solucion: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado, solucion: solucion });
  }
  
}