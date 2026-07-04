package com.solutec.repository;

import com.solutec.entity.Derivacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DerivacionRepository extends JpaRepository<Derivacion, Long> {
    List<Derivacion> findByIncidenciaIdOrderByCreadoEnDesc(Long incidenciaId);
    List<Derivacion> findByProveedorId(Long proveedorId);
}
