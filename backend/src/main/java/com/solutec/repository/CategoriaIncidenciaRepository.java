package com.solutec.repository;

import com.solutec.entity.CategoriaIncidencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaIncidenciaRepository extends JpaRepository<CategoriaIncidencia, Long> {
    Optional<CategoriaIncidencia> findByNombreIgnoreCase(String nombre);
}
