package com.solutec.security;

import com.solutec.entity.Usuario;
import com.solutec.repository.UsuarioRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                Claims claims = jwtService.parseToken(token);
                String correo = claims.getSubject();
                String rol = claims.get("rol", String.class);

                logger.debug("JWT autenticado para {} en {} {}", correo, request.getMethod(), request.getRequestURI());

                // Validar contra la BD para asegurar que no ha sido inhabilitado recientemente
                Optional<Usuario> userOpt = usuarioRepository.findByCorreo(correo);
                if (userOpt.isPresent()) {
                    Usuario user = userOpt.get();

                    // Verificar que el usuario siga aprobado
                    if (!user.isAprobado()) {
                        logger.warn("Usuario {} no está aprobado", correo);
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        response.setContentType("application/json");
                        response.setCharacterEncoding("UTF-8");
                        response.getWriter().write("{\"mensaje\": \"Usuario inhabilitado o no aprobado\"}");
                        return;
                    }

                    // Crear authorities con el rol del usuario
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + rol);

                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            user.getCorreo(),
                            null,
                            Collections.singletonList(authority));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    logger.debug("Usuario {} autenticado con rol {}", user.getCorreo(), rol);
                } else {
                    logger.warn("JWT válido pero no se encontró usuario para correo {}", correo);
                }
            } catch (Exception ex) {
                logger.warn("No se pudo autenticar JWT para {} {}: {}", request.getMethod(), request.getRequestURI(),
                        ex.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }
}