package com.solutec.service;

import com.solutec.dto.HistorialDTO;
import com.solutec.entity.HistorialIncidencia;
import java.util.List;

public interface HistorialService {
    List<HistorialDTO> findAll();
    HistorialDTO create(HistorialIncidencia h);
}
