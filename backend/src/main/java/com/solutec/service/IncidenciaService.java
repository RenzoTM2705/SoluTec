package com.solutec.service;

import com.solutec.dto.IncidenciaDTO;
import com.solutec.entity.Incidencia;
import java.util.List;

public interface IncidenciaService {
    List<IncidenciaDTO> findAll();
    IncidenciaDTO findById(Long id);
    IncidenciaDTO create(Incidencia i);
    IncidenciaDTO update(Long id, Incidencia i);
    IncidenciaDTO changeEstado(Long id, String estadoNombre);
    void delete(Long id);
}
