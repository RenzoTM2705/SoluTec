package com.solutec.dto;

public class RegisterResponse {
    private Long id;
    private String nombre;
    private String correo;
    private boolean aprobado;

    public RegisterResponse() {}

    public RegisterResponse(Long id, String nombre, String correo, boolean aprobado) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.aprobado = aprobado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public boolean isAprobado() { return aprobado; }
    public void setAprobado(boolean aprobado) { this.aprobado = aprobado; }
}