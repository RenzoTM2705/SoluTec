import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private tokenKey = 'token';
    private userKey = 'user';

    private currentUserSubject = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadUserFromStorage();
    }

    private loadUserFromStorage(): void {
        const savedUser = localStorage.getItem(this.userKey);
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                this.currentUserSubject.next(user);
                console.log('Usuario cargado del localStorage:', user);
            } catch (e) {
                console.error('Error al cargar usuario:', e);
                localStorage.removeItem(this.userKey);
            }
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }

    setAuthData(response: any): void {
        console.log('Guardando datos de autenticación...');
        console.log('Response:', response);

        if (response && response.token) {
            // Guardar token
            localStorage.setItem(this.tokenKey, response.token);
            console.log('Token guardado ✓');

            // Guardar usuario
            const user = {
                correo: response.correo,
                nombre: response.nombre,
                rol: response.rol,
                aprobado: response.aprobado
            };
            localStorage.setItem(this.userKey, JSON.stringify(user));
            this.currentUserSubject.next(user);

            console.log('Usuario guardado:', user);
            console.log('✅ Datos de autenticación guardados correctamente');
        } else {
            console.error('❌ No se recibió token en la respuesta');
        }
    }

    login(correo: string, password: string): Observable<any> {
        console.log('Enviando petición de login...');
        return this.http.post(`${this.apiUrl}/login`, { correo, password });
    }

    register(usuario: any): Observable<string> {
        return this.http.post(`${this.apiUrl}/register`, usuario, {
            responseType: 'text'
        });
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.currentUserSubject.next(null);
        console.log('Sesión cerrada');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUser();
        const isValid = !!token && !!user;
        console.log('isAuthenticated:', isValid);
        return isValid;
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user && user.rol?.toUpperCase() === 'ADMIN';
    }

    isSoporte(): boolean {
        const user = this.getCurrentUser();
        const rol = user?.rol?.toUpperCase();
        return user && (rol === 'ADMIN' || rol === 'SOPORTE');
    }

    getRol(): string | null {
        const user = this.getCurrentUser();
        return user ? user.rol : null;
    }
}