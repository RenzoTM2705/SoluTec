import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/notificaciones';

  getMisNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  marcarComoLeida(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/leer`, {});
  }
}