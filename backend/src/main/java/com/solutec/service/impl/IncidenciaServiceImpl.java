package com.solutec.service.impl;

import com.solutec.dto.IncidenciaDTO;
import com.solutec.entity.Estado;
import com.solutec.entity.HistorialIncidencia;
import com.solutec.entity.Incidencia;
import com.solutec.entity.Notificacion;
import com.solutec.entity.Prioridad; 
import com.solutec.entity.Usuario;
import com.solutec.repository.EstadoRepository;
import com.solutec.repository.HistorialIncidenciaRepository;
import com.solutec.repository.IncidenciaRepository;
import com.solutec.repository.NotificacionRepository;
import com.solutec.repository.PrioridadRepository; 
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.IncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncidenciaServiceImpl implements IncidenciaService {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private HistorialIncidenciaRepository historialRepository;

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private PrioridadRepository prioridadRepository;

    @Override
    public List<IncidenciaDTO> findAll() {
        return incidenciaRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public IncidenciaDTO findById(Long id) {
        return incidenciaRepository.findById(id).map(this::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Incidencia no encontrada"));
    }

@Override
    @Transactional
    public IncidenciaDTO create(Incidencia i) {
        // 1. Obtener el usuario autenticado
        Usuario usuarioActual = getUsuarioAutenticado();
        i.setCreador(usuarioActual);
        i.setCreadoEn(LocalDateTime.now());

        // 2. Asignar el estado por default a Pendiente
        Estado pendiente = estadoRepository.findByNombreIgnoreCase("PENDIENTE")
                .orElseThrow(() -> new RuntimeException("Estado PENDIENTE no encontrado en la base de datos"));
        i.setEstado(pendiente);

        //3 Asignar la prioridad por defecto (ej. ID 1 que podría ser "Baja" o "No Asignada")
        Prioridad prioridadDefecto = prioridadRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Prioridad por defecto no encontrada en la base de datos"));
        i.setPrioridad(prioridadDefecto);

        Incidencia saved = incidenciaRepository.save(i);

        // 4. Registrar en el historial
        registrarHistorial("Incidencia creada", saved, usuarioActual);

        return toDto(saved);
    }

    @Override
    @Transactional
    public IncidenciaDTO update(Long id, Incidencia i) {
        return incidenciaRepository.findById(id).map(existing -> {
            existing.setTitulo(i.getTitulo());
            existing.setDescripcion(i.getDescripcion());
            
            // Si cambian categorías o prioridad, se actualizan
            if (i.getPrioridad() != null) existing.setPrioridad(i.getPrioridad());
            if (i.getCategoria() != null) existing.setCategoria(i.getCategoria());
            
            // Registrar el nombre del técnico en el historial
            if (i.getAsignado() != null && (existing.getAsignado() == null || !existing.getAsignado().getId().equals(i.getAsignado().getId()))) {
                existing.setAsignado(i.getAsignado());
                registrarHistorial("Incidencia asignada al técnico: " + i.getAsignado().getNombre(), existing, getUsuarioAutenticado());
            }

            return toDto(incidenciaRepository.save(existing));
        }).orElseThrow(() -> new IllegalArgumentException("Incidencia no encontrada para actualizar"));
    }

    @Override
    @Transactional
    public IncidenciaDTO changeEstado(Long id, String estadoNombre) {
        return incidenciaRepository.findById(id).map(existing -> {
            Estado nuevoEstado = estadoRepository.findByNombreIgnoreCase(estadoNombre)
                    .orElseThrow(() -> new IllegalArgumentException("El estado '" + estadoNombre + "' no es válido"));
            
            // Solo actuar si el estado realmente cambia
            if (!existing.getEstado().getId().equals(nuevoEstado.getId())) {
                existing.setEstado(nuevoEstado);
                Incidencia saved = incidenciaRepository.save(existing);
                
                Usuario usuarioActual = getUsuarioAutenticado();

                // Registrar el cambio en el historial
                registrarHistorial("Estado cambiado a: " + nuevoEstado.getNombre(), saved, usuarioActual);

                // Notificar al creador de la incidencia el cambio de estado
                if (saved.getCreador() != null) {
                    crearNotificacion("Tu incidencia '" + saved.getTitulo() + "' ha cambiado a estado: " + nuevoEstado.getNombre(), saved.getCreador());
                }
                
                return toDto(saved);
            }
            
            return toDto(existing);
        }).orElseThrow(() -> new IllegalArgumentException("Incidencia no encontrada"));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!incidenciaRepository.existsById(id)) {
            throw new IllegalArgumentException("Incidencia no encontrada");
        }
        incidenciaRepository.deleteById(id);
    }

    // --- Métodos Privados Auxiliares ---

    private Usuario getUsuarioAutenticado() {
        String correo = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no autenticado o no encontrado"));
    }

    private void registrarHistorial(String accion, Incidencia incidencia, Usuario usuario) {
        HistorialIncidencia historial = new HistorialIncidencia();
        historial.setAccion(accion);
        historial.setFecha(LocalDateTime.now());
        historial.setIncidencia(incidencia);
        historial.setUsuario(usuario);
        historialRepository.save(historial);
    }

    private void crearNotificacion(String mensaje, Usuario destinatario) {
        Notificacion notificacion = new Notificacion();
        notificacion.setMensaje(mensaje);
        notificacion.setLeida(false);
        notificacion.setCreadoEn(LocalDateTime.now());
        notificacion.setUsuario(destinatario);
        notificacionRepository.save(notificacion);
    }

    private IncidenciaDTO toDto(Incidencia i) {
        IncidenciaDTO dto = new IncidenciaDTO();
        dto.setId(i.getId());
        dto.setTitulo(i.getTitulo());
        dto.setDescripcion(i.getDescripcion());
        dto.setCreadoEn(i.getCreadoEn());
        dto.setEstadoNombre(i.getEstado() != null ? i.getEstado().getNombre() : null);
        dto.setPrioridadNombre(i.getPrioridad() != null ? i.getPrioridad().getNombre() : null);
        dto.setCategoriaNombre(i.getCategoria() != null ? i.getCategoria().getNombre() : null);
        dto.setCreadorNombre(i.getCreador() != null ? i.getCreador().getNombre() : null);
        dto.setAsignadoNombre(i.getAsignado() != null ? i.getAsignado().getNombre() : null);
        dto.setSolucion(i.getSolucion());
        return dto;
    }
}