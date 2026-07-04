package com.solutec.service.impl;

import com.solutec.dto.RolDTO;
import com.solutec.entity.Rol;
import com.solutec.repository.RolRepository;
import com.solutec.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository rolRepository;

    @Override
    public List<RolDTO> findAll() {
        return rolRepository.findAll().stream().map(r -> {
            RolDTO dto = new RolDTO(); dto.setId(r.getId()); dto.setNombre(r.getNombre()); return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public RolDTO create(Rol rol) {
        rol = rolRepository.save(rol);
        RolDTO dto = new RolDTO(); dto.setId(rol.getId()); dto.setNombre(rol.getNombre()); return dto;
    }
}
