package com.notes.server.dao;

import com.notes.server.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface TagRepository extends JpaRepository<Tag, Integer> {
    List<Tag> findByUserIdOrderByName(int userId);
    Tag findByNameAndUserId(String name, int userId);

    void deleteByIdAndUserId(int id, int userId);
}
