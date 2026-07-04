package com.solutec.service.impl;

import com.solutec.dto.ComentarioDTO;
import com.solutec.entity.Comentario;
import com.solutec.entity.Incidencia;
import com.solutec.entity.Usuario;
import com.solutec.repository.ComentarioRepository;
import com.solutec.repository.IncidenciaRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComentarioServiceImpl implements ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Override
    public List<ComentarioDTO> findAll() {
        return comentarioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ComentarioDTO create(Comentario comentario) {
        if (comentario.getUsuario() != null && comentario.getUsuario().getId() != null) {
            Usuario u = usuarioRepository.findById(comentario.getUsuario().getId()).orElse(null);
            comentario.setUsuario(u);
        }
        if (comentario.getIncidencia() != null && comentario.getIncidencia().getId() != null) {
            Incidencia i = incidenciaRepository.findById(comentario.getIncidencia().getId()).orElse(null);
            comentario.setIncidencia(i);
        }
        return toDto(comentarioRepository.save(comentario));
    }

    private ComentarioDTO toDto(Comentario c) {
        ComentarioDTO dto = new ComentarioDTO();
        dto.setId(c.getId()); dto.setTexto(c.getTexto());
        if (c.getUsuario() != null) dto.setUsuarioId(c.getUsuario().getId());
        if (c.getIncidencia() != null) dto.setIncidenciaId(c.getIncidencia().getId());
        dto.setCreadoEn(c.getCreadoEn());
        return dto;
    }
}
