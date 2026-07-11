package com.solutec.controller;

import com.solutec.dto.LoginRequest;
import com.solutec.dto.LoginResponse;
import com.solutec.entity.Rol;
import com.solutec.entity.Usuario;
import com.solutec.repository.RolRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> userOpt = usuarioRepository.findByCorreo(request.getCorreo());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("mensaje", "Usuario no encontrado"));
        }

        Usuario user = userOpt.get();

        // Verificar si el usuario está aprobado por el administrador
        if (!user.isAprobado()) {
            return ResponseEntity.status(403).body(Collections.singletonMap("mensaje", "Usuario pendiente de aprobación por el Administrador"));
        }

        // Verificar password
        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("mensaje", "Contraseña incorrecta"));
        }

        // Generar token JWT con información del usuario
        String token = jwtService.generateToken(user);

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setCorreo(user.getCorreo());
        response.setNombre(user.getNombre());
        response.setRol(user.getRol().getNombre());
        response.setAprobado(user.isAprobado());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        // Verificar si el correo ya existe
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("mensaje", "El correo ya está registrado"));
        }

        // Encriptar password y bloquear el usuario hasta que un Admin lo apruebe
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        usuario.setAprobado(false);

        // Asignar rol EMPLEADO por defecto
        Rol rolEmpleado = rolRepository.findByNombre("EMPLEADO")
                .orElseThrow(() -> new RuntimeException("Rol EMPLEADO no encontrado en la base de datos"));
        usuario.setRol(rolEmpleado);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok(Collections.singletonMap("mensaje", "Usuario registrado exitosamente. Esperando aprobación del administrador."));
    }
}