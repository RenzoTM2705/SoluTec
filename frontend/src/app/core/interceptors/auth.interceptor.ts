import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 1. Agregamos el token de autenticación a todas las peticiones HTTP
        const token = localStorage.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // 2. Manejamos los errores de las respuestas HTTP
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Si el token expiró o es inválido, cerramos sesión
                if (error.status === 401 && !request.url.includes('/login')) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                }

                let errorMessage = 'Error al conectar con el servidor.';

                // 3. Intentamos extraer un mensaje más específico del error
                if (error.error) {
                    if (typeof error.error === 'string') {
                        try {
                            const parsed = JSON.parse(error.error);
                            errorMessage = parsed.mensaje || error.error;
                        } catch {
                            errorMessage = error.error;
                        }
                    } else if (error.error.mensaje) {
                        errorMessage = error.error.mensaje;
                    }
                }

                // 4. Retornamos un observable con el mensaje de error para que pueda ser manejado en el componente
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}