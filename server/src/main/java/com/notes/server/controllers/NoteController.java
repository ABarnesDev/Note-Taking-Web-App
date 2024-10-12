package com.notes.server.controllers;

import com.notes.server.dto.NoteDto;
import com.notes.server.dto.UserDto;
import com.notes.server.services.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/notes")
@RestController
public class NoteController {

    private final NoteService noteService;

    @GetMapping("/")
    public List<NoteDto> getNotes(@AuthenticationPrincipal UserDto userDto) {
        return noteService.getNotesByUser(userDto);
    }

    @GetMapping("/{id}")
    public NoteDto getNote(@AuthenticationPrincipal UserDto userDto, @PathVariable int id) {
        return noteService.getNote(id, userDto);
    }

    @PostMapping("/create")
    public NoteDto createNote(@AuthenticationPrincipal UserDto userDto) {
        return noteService.createNote(userDto);
    }

    @PutMapping("/update")
    public NoteDto updateNote(@AuthenticationPrincipal UserDto userDto, @RequestBody NoteDto noteDto) {
        return noteService.updateNote(noteDto, userDto);
    }

    @DeleteMapping("/delete")
    public void deleteNote(@AuthenticationPrincipal UserDto userDto, @RequestParam int noteId) {
        noteService.deleteNote(noteId, userDto);
    }
}
