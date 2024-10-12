package com.notes.server.controllers;

import com.notes.server.config.UserAuthProvider;
import com.notes.server.dto.LoginDto;
import com.notes.server.dto.SignupDto;
import com.notes.server.dto.UserDto;
import com.notes.server.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api")
@RestController
public class UserController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;

    @GetMapping("/user")
    public UserDto getUser(@AuthenticationPrincipal UserDto userDto) {
        return userService.getUser(userDto.getId());
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@Valid @RequestBody LoginDto loginDto) {
        UserDto user = userService.login(loginDto);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody SignupDto signupDto) {
        UserDto user = userService.register(signupDto);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@AuthenticationPrincipal UserDto userDto) {
        userService.deleteUser(userDto.getId());
    }
}
