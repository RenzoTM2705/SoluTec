import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {

  private ADMIN_EMAIL = 'admin@solutec.com';
  private ADMIN_PASS = 'adminpass';

  login(email: string, password: string): boolean {

    if (email === this.ADMIN_EMAIL && password === this.ADMIN_PASS) {
      localStorage.setItem('session', JSON.stringify({
        email,
        role: 'ADMIN'
      }));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('session');
  }

  register(user: any) {

    const users = JSON.parse(localStorage.getItem('pendingUsers') || '[]');

    users.push({
      id: Date.now(),
      name: user.nombre,
      email: user.correo,
      role: 'Sin asignar',
      authorized: false
    });

    localStorage.setItem('pendingUsers', JSON.stringify(users));
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('pendingUsers') || '[]');
  }

  saveUsers(users: any[]) {
    localStorage.setItem('pendingUsers', JSON.stringify(users));
  }
}