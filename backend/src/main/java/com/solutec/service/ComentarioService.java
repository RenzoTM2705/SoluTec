package com.solutec.service;

import com.solutec.dto.ComentarioDTO;
import com.solutec.entity.Comentario;
import java.util.List;

public interface ComentarioService {
    List<ComentarioDTO> findAll();
    ComentarioDTO create(Comentario comentario);
}
