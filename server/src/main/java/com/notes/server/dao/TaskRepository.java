package com.notes.server.dao;

import com.notes.server.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.*;
import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUserIdAndCreateDateOrderByIsCompleted(Integer user_id, LocalDate createDate);
    Task findByIdAndUserId(int task_id, int user_id);
}
