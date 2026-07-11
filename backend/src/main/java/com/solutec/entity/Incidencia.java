package com.solutec.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "incidencias")
public class Incidencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;
    private LocalDateTime creadoEn = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "prioridad_id")
    private Prioridad prioridad;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaIncidencia categoria;

    @ManyToOne
    @JoinColumn(name = "creador_id")
    private Usuario creador;

    @ManyToOne
    @JoinColumn(name = "asignado_id")
    private Usuario asignado;

    @OneToMany(mappedBy = "incidencia", cascade = CascadeType.ALL)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToMany(mappedBy = "incidencia", cascade = CascadeType.ALL)
    private List<Diagnostico> diagnosticos = new ArrayList<>();

    @OneToMany(mappedBy = "incidencia", cascade = CascadeType.ALL)
    private List<Derivacion> derivaciones = new ArrayList<>();

    @Column(length = 1000)
    private String solucion;

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public LocalDateTime getCreadoEn() { return creadoEn; }
    public void setCreadoEn(LocalDateTime creadoEn) { this.creadoEn = creadoEn; }
    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }
    public Prioridad getPrioridad() { return prioridad; }
    public void setPrioridad(Prioridad prioridad) { this.prioridad = prioridad; }
    public CategoriaIncidencia getCategoria() { return categoria; }
    public void setCategoria(CategoriaIncidencia categoria) { this.categoria = categoria; }
    public Usuario getCreador() { return creador; }
    public void setCreador(Usuario creador) { this.creador = creador; }
    public Usuario getAsignado() { return asignado; }
    public void setAsignado(Usuario asignado) { this.asignado = asignado; }
    public List<Comentario> getComentarios() { return comentarios; }
    public void setComentarios(List<Comentario> comentarios) { this.comentarios = comentarios; }
    public List<Diagnostico> getDiagnosticos() { return diagnosticos; }
    public void setDiagnosticos(List<Diagnostico> diagnosticos) { this.diagnosticos = diagnosticos; }
    public List<Derivacion> getDerivaciones() { return derivaciones; }
    public void setDerivaciones(List<Derivacion> derivaciones) { this.derivaciones = derivaciones; }
    public String getSolucion() { return solucion; }
    public void setSolucion(String solucion) { this.solucion = solucion; }
}
