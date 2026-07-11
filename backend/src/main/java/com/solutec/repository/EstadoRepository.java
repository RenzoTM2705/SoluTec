package com.solutec.repository;

import com.solutec.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadoRepository extends JpaRepository<Estado, Long> {
    
    Optional<Estado> findByNombre(String nombre);
    Optional<Estado> findByNombreIgnoreCase(String nombre);
    
}