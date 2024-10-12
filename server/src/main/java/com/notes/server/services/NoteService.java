package com.notes.server.services;

import com.notes.server.dto.NoteDto;
import com.notes.server.dto.UserDto;

import java.util.List;

public interface NoteService {

    NoteDto getNote(int noteId, UserDto userDto);
    List<NoteDto> getNotesByUser(UserDto userDto);
    NoteDto createNote(UserDto userDto);
    NoteDto updateNote(NoteDto noteDto, UserDto userDto);
    void deleteNote(int noteId, UserDto userDto);
}
