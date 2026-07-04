package com.solutec.repository;

import com.solutec.entity.Prioridad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PrioridadRepository extends JpaRepository<Prioridad, Long> {
    Optional<Prioridad> findByNombreIgnoreCase(String nombre);
}
