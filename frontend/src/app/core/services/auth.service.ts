import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Obtiene el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verifica si el usuario tiene un token activo
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Recupera los datos del usuario logueado
  getCurrentUser(): any {
    const nombre = localStorage.getItem('userName');
    const rol = localStorage.getItem('userRole');
    
    if (nombre && rol) {
      return { nombre, rol };
    }
    return null;
  }

  // Cierra la sesión limpiando el almacenamiento
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}