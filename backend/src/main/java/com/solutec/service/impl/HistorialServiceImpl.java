package com.solutec.service.impl;

import com.solutec.dto.HistorialDTO;
import com.solutec.entity.HistorialIncidencia;
import com.solutec.entity.Incidencia;
import com.solutec.entity.Usuario;
import com.solutec.repository.HistorialIncidenciaRepository;
import com.solutec.repository.IncidenciaRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.HistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistorialServiceImpl implements HistorialService {

    @Autowired
    private HistorialIncidenciaRepository historialRepository;
    @Autowired
    private IncidenciaRepository incidenciaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<HistorialDTO> findAll() {
        return historialRepository.findAll().stream().map(h -> {
            HistorialDTO dto = new HistorialDTO();
            dto.setId(h.getId()); dto.setAccion(h.getAccion()); dto.setFecha(h.getFecha());
            if (h.getIncidencia() != null) dto.setIncidenciaId(h.getIncidencia().getId());
            if (h.getUsuario() != null) dto.setUsuarioId(h.getUsuario().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public HistorialDTO create(HistorialIncidencia h) {
        if (h.getIncidencia() != null && h.getIncidencia().getId() != null) h.setIncidencia(incidenciaRepository.findById(h.getIncidencia().getId()).orElse(null));
        if (h.getUsuario() != null && h.getUsuario().getId() != null) h.setUsuario(usuarioRepository.findById(h.getUsuario().getId()).orElse(null));
        HistorialIncidencia saved = historialRepository.save(h);
        HistorialDTO dto = new HistorialDTO(); dto.setId(saved.getId()); dto.setAccion(saved.getAccion()); dto.setFecha(saved.getFecha());
        if (saved.getIncidencia() != null) dto.setIncidenciaId(saved.getIncidencia().getId());
        if (saved.getUsuario() != null) dto.setUsuarioId(saved.getUsuario().getId());
        return dto;
    }
}
