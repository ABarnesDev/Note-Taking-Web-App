package com.notes.server.services;

import com.notes.server.dao.UserRepository;
import com.notes.server.dto.LoginDto;
import com.notes.server.dto.SignupDto;
import com.notes.server.entities.User;
import com.notes.server.exceptions.InvalidPasswordException;
import com.notes.server.exceptions.UserExistsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

// Completed part D
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    private User user;

    @BeforeEach
    void setUp() {
        // Create a user to use in the unit tests
        user = new User();
        user.setUsername("Test User");
        user.setEmail("test@test.com");
        user.setPassword(new BCryptPasswordEncoder().encode("P@ssword1"));
    }

    // Attempt to log in with an incorrect password
    @Test
    void loginIncorrectPassword() {
        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("test@test.com");
        loginDto.setPassword("incorrect");

        when(userRepository.findByEmail(loginDto.getEmail())).thenReturn(Optional.ofNullable(user));
        // This should return false because the password doesn't match the user's password
        when(passwordEncoder.matches(loginDto.getPassword(), user.getPassword())).thenReturn(false);

        // The method should throw an InvalidPasswordException
        assertThrows(InvalidPasswordException.class, () -> userService.login(loginDto));
    }

    // Attempt to sign up with a taken email
    @Test
    void registerEmailAlreadyExists() {
        SignupDto signupDto = new SignupDto();
        signupDto.setUsername("Test User");
        signupDto.setEmail("test@test.com");
        signupDto.setPassword("P@ssword1");

        // This should return a user since the email matches the email of the user that has already been created
        when(userRepository.findByEmail(signupDto.getEmail())).thenReturn(Optional.ofNullable(user));

        // The method should throw a UserExistsException
        assertThrows(UserExistsException.class, () -> userService.register(signupDto));
    }
}