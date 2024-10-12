package com.notes.server.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.notes.server.dao.UserRepository;
import com.notes.server.dto.UserDto;
import com.notes.server.entities.User;
import com.notes.server.exceptions.UserNotFoundException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto user) {
        Date now = new Date();

        // Create a new token that expires in 5 hours
        return JWT.create()
                .withIssuer(user.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(new Date(now.getTime() + 18000000))
                .withClaim("id", user.getId())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {

        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT jwt = verifier.verify(token);

        UserDto user = UserDto.builder()
                .id(jwt.getClaim("id").asInt())
                .email(jwt.getIssuer())
                .username(jwt.getClaim("username").asString())
                .build();

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    public Authentication validateTokenStrong(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey)).build();
        DecodedJWT jwt = verifier.verify(token);

        User user = userRepository.findByEmail(jwt.getIssuer()).orElseThrow(() -> new UserNotFoundException("User not found"));

        return new UsernamePasswordAuthenticationToken(modelMapper.map(user, UserDto.class), null, Collections.emptyList());
    }

}
