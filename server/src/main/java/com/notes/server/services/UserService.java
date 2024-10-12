package com.notes.server.services;

import com.notes.server.dto.LoginDto;
import com.notes.server.dto.SignupDto;
import com.notes.server.dto.UserDto;

public interface UserService {

    UserDto login(LoginDto loginDto);
    UserDto register(SignupDto signupDto);
    UserDto getUser(int userId);
    void deleteUser(int userId);
}
