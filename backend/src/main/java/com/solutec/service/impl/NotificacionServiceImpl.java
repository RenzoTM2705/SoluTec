package com.solutec.service.impl;

import com.solutec.entity.Notificacion;
import com.solutec.entity.Usuario;
import com.solutec.repository.NotificacionRepository;
import com.solutec.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificacionServiceImpl {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Notificacion> getMisNotificaciones() {
        Usuario me = getUsuarioAutenticado();
        return notificacionRepository.findByUsuarioAndLeidaFalseOrderByCreadoEnDesc(me);
    }

    @Transactional
    public void marcarComoLeida(Long id) {
        notificacionRepository.findById(id).ifPresent(notif -> {
            // Solo permite marcar como leída si es el dueño de la notificación
            if (notif.getUsuario().getId().equals(getUsuarioAutenticado().getId())) {
                notif.setLeida(true);
                notificacionRepository.save(notif);
            }
        });
    }

    private Usuario getUsuarioAutenticado() {
        String correo = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
    }
}