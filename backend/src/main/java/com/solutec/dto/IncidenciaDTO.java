package com.solutec.dto;

import java.time.LocalDateTime;

public class IncidenciaDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDateTime creadoEn;
    private String estadoNombre;
    private String prioridadNombre;
    private String categoriaNombre;
    private String creadorNombre;
    private String asignadoNombre;
    private String solucion;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getCreadoEn() { return creadoEn; }
    public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }

    public String getEstadoNombre() { return estadoNombre; }
    public void setEstadoNombre(String estadoNombre) { this.estadoNombre = estadoNombre; }

    public String getPrioridadNombre() { return prioridadNombre; }
    public void setPrioridadNombre(String prioridadNombre) { this.prioridadNombre = prioridadNombre; }

    public String getCategoriaNombre() { return categoriaNombre; }
    public void setCategoriaNombre(String categoriaNombre) { this.categoriaNombre = categoriaNombre; }

    public String getCreadorNombre() { return creadorNombre; }
    public void setCreadorNombre(String creadorNombre) { this.creadorNombre = creadorNombre; }

    public String getAsignadoNombre() { return asignadoNombre; }
    public void setAsignadoNombre(String asignadoNombre) { this.asignadoNombre = asignadoNombre; }

    public String getSolucion() { return solucion;}
    public void setSolucion(String solucion) { this.solucion = solucion; }
}
