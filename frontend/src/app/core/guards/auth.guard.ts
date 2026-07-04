import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthenticated = this.authService.isAuthenticated();
        console.log('AuthGuard - isAuthenticated:', isAuthenticated);

        if (!isAuthenticated) {
            console.log('Usuario no autenticado, redirigiendo a login');
            this.router.navigate(['/login']);
            return false;
        }

        // Verificar roles si están definidos en la ruta
        const requiredRoles = route.data['roles'] as Array<string>;
        if (requiredRoles) {
            const user = this.authService.getCurrentUser();
            const userRol = user?.rol?.toUpperCase();
            console.log('AuthGuard - Rol del usuario:', userRol);
            console.log('AuthGuard - Roles requeridos:', requiredRoles);

            const hasRole = requiredRoles.some(role => role.toUpperCase() === userRol);
            if (!hasRole) {
                console.log('Usuario no tiene el rol requerido, redirigiendo');
                this.router.navigate(['/login']);
                return false;
            }
        }

        return true;
    }
}