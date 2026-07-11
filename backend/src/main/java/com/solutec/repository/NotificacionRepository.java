package com.solutec.repository;

import com.solutec.entity.Usuario;
import com.solutec.entity.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByUsuarioAndLeidaFalseOrderByCreadoEnDesc(Usuario usuario);
}
