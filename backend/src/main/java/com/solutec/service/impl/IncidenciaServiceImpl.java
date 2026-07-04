package com.solutec.service.impl;

import com.solutec.dto.IncidenciaDTO;
import com.solutec.entity.Estado;
import com.solutec.entity.Incidencia;
import com.solutec.repository.EstadoRepository;
import com.solutec.repository.IncidenciaRepository;
import com.solutec.service.IncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncidenciaServiceImpl implements IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @Override
    public List<IncidenciaDTO> findAll() {
        return incidenciaRepository.findAll().stream().map(i -> {
            IncidenciaDTO dto = new IncidenciaDTO();
            dto.setId(i.getId());
            dto.setTitulo(i.getTitulo());
            dto.setDescripcion(i.getDescripcion());
            dto.setCreadoEn(i.getCreadoEn());
            dto.setEstadoNombre(i.getEstado() != null ? i.getEstado().getNombre() : null);
            dto.setPrioridadNombre(i.getPrioridad() != null ? i.getPrioridad().getNombre() : null);
            dto.setCategoriaNombre(i.getCategoria() != null ? i.getCategoria().getNombre() : null);
            dto.setCreadorNombre(i.getCreador() != null ? i.getCreador().getNombre() : null);
            dto.setAsignadoNombre(i.getAsignado() != null ? i.getAsignado().getNombre() : null);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public IncidenciaDTO findById(Long id) {
        return incidenciaRepository.findById(id).map(i -> {
            IncidenciaDTO dto = new IncidenciaDTO();
            dto.setId(i.getId());
            dto.setTitulo(i.getTitulo());
            dto.setDescripcion(i.getDescripcion());
            dto.setCreadoEn(i.getCreadoEn());
            dto.setEstadoNombre(i.getEstado() != null ? i.getEstado().getNombre() : null);
            dto.setPrioridadNombre(i.getPrioridad() != null ? i.getPrioridad().getNombre() : null);
            dto.setCategoriaNombre(i.getCategoria() != null ? i.getCategoria().getNombre() : null);
            dto.setCreadorNombre(i.getCreador() != null ? i.getCreador().getNombre() : null);
            dto.setAsignadoNombre(i.getAsignado() != null ? i.getAsignado().getNombre() : null);
            return dto;
        }).orElse(null);
    }

    @Override
    public IncidenciaDTO create(Incidencia i) {
        if (i.getEstado() == null) {
            Estado pendiente = estadoRepository.findByNombreIgnoreCase("PENDIENTE").orElse(null);
            if (pendiente != null) {
                i.setEstado(pendiente);
            }
        }

        Incidencia saved = incidenciaRepository.save(i);
        return toDto(saved);
    }

    @Override
    public IncidenciaDTO update(Long id, Incidencia i) {
        return incidenciaRepository.findById(id).map(existing -> {
            existing.setTitulo(i.getTitulo());
            existing.setDescripcion(i.getDescripcion());
            if (i.getEstado() != null) existing.setEstado(i.getEstado());
            if (i.getPrioridad() != null) existing.setPrioridad(i.getPrioridad());
            if (i.getCategoria() != null) existing.setCategoria(i.getCategoria());
            if (i.getAsignado() != null) existing.setAsignado(i.getAsignado());
            return toDto(incidenciaRepository.save(existing));
        }).orElse(null);
    }

    @Override
    public IncidenciaDTO changeEstado(Long id, String estadoNombre) {
        return incidenciaRepository.findById(id).map(existing -> {
            Estado estado = estadoRepository.findByNombreIgnoreCase(estadoNombre).orElse(null);
            if (estado == null) {
                return null;
            }
            existing.setEstado(estado);
            return toDto(incidenciaRepository.save(existing));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        incidenciaRepository.deleteById(id);
    }

    private IncidenciaDTO toDto(Incidencia i) {
        IncidenciaDTO dto = new IncidenciaDTO();
        dto.setId(i.getId());
        dto.setTitulo(i.getTitulo());
        dto.setDescripcion(i.getDescripcion());
        dto.setCreadoEn(i.getCreadoEn());
        dto.setEstadoNombre(i.getEstado() != null ? i.getEstado().getNombre() : null);
        dto.setPrioridadNombre(i.getPrioridad() != null ? i.getPrioridad().getNombre() : null);
        dto.setCategoriaNombre(i.getCategoria() != null ? i.getCategoria().getNombre() : null);
        dto.setCreadorNombre(i.getCreador() != null ? i.getCreador().getNombre() : null);
        dto.setAsignadoNombre(i.getAsignado() != null ? i.getAsignado().getNombre() : null);
        return dto;
    }
}
