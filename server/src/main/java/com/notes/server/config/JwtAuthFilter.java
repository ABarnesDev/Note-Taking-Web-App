package com.notes.server.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthProvider userAuthProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);

            try {
                if ("GET".equals(request.getMethod())) {
                    SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validateToken(token));
                } else {
                    SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validateTokenStrong(token));
                }
            } catch (RuntimeException e) {
                SecurityContextHolder.clearContext();
                //throw e;
            }
        }

        filterChain.doFilter(request, response);
    }
}
