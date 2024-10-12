package com.notes.server.services;

import com.notes.server.dao.UserRepository;
import com.notes.server.dto.LoginDto;
import com.notes.server.dto.SignupDto;
import com.notes.server.dto.UserDto;
import com.notes.server.entities.User;
import com.notes.server.exceptions.InvalidPasswordException;
import com.notes.server.exceptions.UserExistsException;
import com.notes.server.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public UserDto login(LoginDto loginDto) {
        // If the user doesn't exist throw an error
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new UserNotFoundException("User not found"));

        // If the password is correct return the user otherwise throw an error
        if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return modelMapper.map(user, UserDto.class);
        }
        throw new InvalidPasswordException("Invalid password");
    }

    @Override
    public UserDto register(SignupDto signupDto) {

        // If the user already exists throw an error otherwise create and return a new user
        if (userRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            throw new UserExistsException("Email address already in use");
        }

        User user = new User();
        user.setUsername(signupDto.getUsername());
        user.setEmail(signupDto.getEmail());
        user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
        User newUser = userRepository.save(user);

        return modelMapper.map(newUser, UserDto.class);
    }

    @Override
    public UserDto getUser(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }
}
