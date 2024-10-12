package com.notes.server.controllers;

import com.notes.server.dto.TaskDto;
import com.notes.server.dto.UserDto;
import com.notes.server.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/tasks")
@RestController
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/")
    public List<TaskDto> getTasks(@AuthenticationPrincipal UserDto userDto, @RequestParam String date) {
        return taskService.getTasks(userDto, LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-M-d")));
    }
    @PostMapping("/create")
    public TaskDto createTask(@AuthenticationPrincipal UserDto userDto, @RequestBody TaskDto taskDto) {
        return taskService.createTask(userDto, taskDto);
    }

    @PutMapping("/update")
    public TaskDto updateTask(@AuthenticationPrincipal UserDto userDto, @RequestBody TaskDto taskDto) {
        return taskService.updateTask(userDto, taskDto);
    }

    @DeleteMapping("/delete")
    public void deleteTask(@AuthenticationPrincipal UserDto userDto, @RequestParam int taskId) {
        taskService.deleteTask(userDto, taskId);
    }
}
