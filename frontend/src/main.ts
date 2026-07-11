import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor'; 

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        
        // 1. Se proporciona el cliente HTTP con la capacidad de usar interceptores desde la inyección de dependencias
        provideHttpClient(withInterceptorsFromDi()),
        
        // 2. Registramos nuestro interceptor de autenticación para que se aplique a todas las solicitudes HTTP
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
}).catch(err => console.error(err));