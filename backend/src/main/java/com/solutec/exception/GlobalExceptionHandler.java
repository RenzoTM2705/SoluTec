package com.solutec.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Maneja los errores de validación de negocio que se lanza en Services ( ex: en caso el correo ya exista)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Collections.singletonMap("mensaje", ex.getMessage()));
    }

    // Maneja errores de base de datos como llaves foráneas ( ex: borrar un usuario con incidencias)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Collections.singletonMap("mensaje", "Error de integridad: El registro no puede ser eliminado o modificado porque está siendo utilizado en otra parte del sistema."));
    }

    // Maneja errores de permisos ( ex: acceso a clase Admin)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Collections.singletonMap("mensaje", "No tienes los permisos necesarios para realizar esta acción."));
    }

    // Maneja cualquier otro error no contemplado ( evita la caida del backend y tira un mensaje custom para error 500 )
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        // Imprimirá el stack trace del error en la consola para facilitar la depuración
        ex.printStackTrace();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("mensaje", "Ha ocurrido un error interno en el servidor. Por favor, contacte a soporte."));
    }
}