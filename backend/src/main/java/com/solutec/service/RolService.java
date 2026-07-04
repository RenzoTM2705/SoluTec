package com.solutec.service;

import com.solutec.dto.RolDTO;
import com.solutec.entity.Rol;
import java.util.List;

public interface RolService {
    List<RolDTO> findAll();
    RolDTO create(Rol rol);
}
