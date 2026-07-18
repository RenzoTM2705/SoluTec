package com.solutec.dto;

import java.util.Map;

public class DashboardStatsDTO {

    private long totalIncidencias;
    private long pendientes;
    private long enProceso;
    private long resueltas;
    private Map<String, Long> incidenciasPorEstado;
    private Map<String, Long> incidenciasPorDepartamento;

    public long getTotalIncidencias() {
        return totalIncidencias;
    }

    public void setTotalIncidencias(long totalIncidencias) {
        this.totalIncidencias = totalIncidencias;
    }

    public long getPendientes() {
        return pendientes;
    }

    public void setPendientes(long pendientes) {
        this.pendientes = pendientes;
    }

    public long getEnProceso() {
        return enProceso;
    }

    public void setEnProceso(long enProceso) {
        this.enProceso = enProceso;
    }

    public long getResueltas() {
        return resueltas;
    }

    public void setResueltas(long resueltas) {
        this.resueltas = resueltas;
    }

    public Map<String, Long> getIncidenciasPorEstado() {
        return incidenciasPorEstado;
    }

    public void setIncidenciasPorEstado(Map<String, Long> incidenciasPorEstado) {
        this.incidenciasPorEstado = incidenciasPorEstado;
    }

    public Map<String, Long> getIncidenciasPorDepartamento() {
        return incidenciasPorDepartamento;
    }

    public void setIncidenciasPorDepartamento(Map<String, Long> incidenciasPorDepartamento) {
        this.incidenciasPorDepartamento = incidenciasPorDepartamento;
    }
}