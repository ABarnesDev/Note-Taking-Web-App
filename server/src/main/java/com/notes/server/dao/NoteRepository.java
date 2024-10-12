package com.notes.server.dao;

import com.notes.server.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByUserIdOrderByLastUpdateDesc(int userId);
    Note findByIdAndUserId(int noteId, int userId);
}
