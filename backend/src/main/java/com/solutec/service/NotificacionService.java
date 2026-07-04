package com.solutec.service;

import com.solutec.dto.NotificacionDTO;
import com.solutec.entity.Notificacion;
import java.util.List;

public interface NotificacionService {
    List<NotificacionDTO> findAll();
    NotificacionDTO create(Notificacion n);
}
