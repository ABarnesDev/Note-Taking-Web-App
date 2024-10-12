package com.notes.server.services;

import com.notes.server.dao.TaskRepository;
import com.notes.server.dao.UserRepository;
import com.notes.server.dto.TaskDto;
import com.notes.server.dto.UserDto;
import com.notes.server.entities.Task;
import com.notes.server.entities.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<TaskDto> getTasks(UserDto userDto, LocalDate date) {
        // Find tasks created by a specific user on a specific date
        List<Task> tasks = this.taskRepository.findByUserIdAndCreateDateOrderByIsCompleted(userDto.getId(), date);

        return tasks.stream().map(task -> modelMapper.map(task, TaskDto.class)).collect(Collectors.toList());
    }

    @Override
    public TaskDto createTask(UserDto userDto, TaskDto taskDto) {
        User user = userRepository.findById(userDto.getId()).get();

        Task task = new Task();
        task.setUser(user);
        task.setIsCompleted(false);
        task.setContent(taskDto.getContent());
        task.setCreateDate(taskDto.getCreateDate());

        Task createdTask = taskRepository.save(task);

        return modelMapper.map(createdTask, TaskDto.class);
    }

    @Override
    public TaskDto updateTask(UserDto userDto, TaskDto taskDto) {
        Task task = taskRepository.findByIdAndUserId(taskDto.getId(), userDto.getId());
        task.setContent(taskDto.getContent());
        task.setIsCompleted(taskDto.getIsCompleted());

        Task updatedTask = taskRepository.save(task);

        return modelMapper.map(updatedTask, TaskDto.class);
    }

    @Override
    public void deleteTask(UserDto userDto, int taskId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userDto.getId());
        taskRepository.delete(task);
    }
}
