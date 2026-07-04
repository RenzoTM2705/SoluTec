package com.solutec.service.impl;

import com.solutec.dto.NotificacionDTO;
import com.solutec.entity.Notificacion;
import com.solutec.entity.Usuario;
import com.solutec.repository.NotificacionRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacionServiceImpl implements NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<NotificacionDTO> findAll() {
        return notificacionRepository.findAll().stream().map(n -> {
            NotificacionDTO dto = new NotificacionDTO();
            dto.setId(n.getId()); dto.setMensaje(n.getMensaje()); dto.setLeida(n.isLeida()); dto.setCreadoEn(n.getCreadoEn());
            if (n.getUsuario() != null) dto.setUsuarioId(n.getUsuario().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public NotificacionDTO create(Notificacion n) {
        if (n.getUsuario() != null && n.getUsuario().getId() != null) n.setUsuario(usuarioRepository.findById(n.getUsuario().getId()).orElse(null));
        Notificacion saved = notificacionRepository.save(n);
        NotificacionDTO dto = new NotificacionDTO(); dto.setId(saved.getId()); dto.setMensaje(saved.getMensaje()); dto.setLeida(saved.isLeida()); dto.setCreadoEn(saved.getCreadoEn());
        if (saved.getUsuario() != null) dto.setUsuarioId(saved.getUsuario().getId());
        return dto;
    }
}
