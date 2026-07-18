import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any {
    const nombre = localStorage.getItem('userName');
    let rol = localStorage.getItem('userRole');
    
    if (nombre && rol) {
      // Normalizamos el rol quitando prefijos de Spring Security
      rol = rol.replace('ROLE_', '').toUpperCase();
      return { nombre, rol };
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}