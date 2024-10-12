package com.notes.server.services;

import com.notes.server.dto.TaskDto;
import com.notes.server.dto.UserDto;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {
    List<TaskDto> getTasks(UserDto userDto, LocalDate date);
    TaskDto createTask(UserDto userDto, TaskDto taskDto);
    TaskDto updateTask(UserDto userDto, TaskDto taskDto);
    void deleteTask(UserDto userDto, int taskId);
}
